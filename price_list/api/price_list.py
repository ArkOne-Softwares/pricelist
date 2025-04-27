# -*- coding: utf-8 -*-
# Copyright (c) 2025, Your Company and contributors
# For license information, please see license.txt

# from __future__ import unicode_literals
import frappe
from frappe import _
from frappe.utils import flt, cint, get_datetime, now_datetime, add_days


@frappe.whitelist()
def get_items_with_prices(price_list="Standard Selling", item_code=None, item_group=None):
    """
    Get items with their prices from a specific price list, optimized for mobile display
    
    Args:
        price_list (str): The price list to fetch prices from
        item_code (str, optional): Filter by specific item code
        item_group (str, optional): Filter by specific item group
        
    Returns:
        list: List of items with their price information
    """
    # Fix: Replace 'selling' with proper field 'is_sales_item'
    filters = {"is_sales_item": 1, "disabled": 0}
    if item_code:
        filters["name"] = item_code
    if item_group:
        filters["item_group"] = item_group
    
    # Get items that are available for selling
    items = frappe.get_all(
        "Item",
        filters=filters,
        fields=[
            "name as item_code", 
            "item_name", 
            "item_group", 
            "description", 
            "image",
            "standard_rate",
            "has_variants", 
            "is_stock_item"
        ]
    )
    
    # Get item prices for the specified price list
    item_codes = [item.item_code for item in items]
    if not item_codes:
        return []
    
    # Get price list rates
    price_list_rates = frappe._dict()
    if item_codes:
        price_list_data = frappe.get_all(
            "Item Price",
            filters={
                "price_list": price_list,
                "item_code": ["in", item_codes],
                "selling": 1
            },
            fields=["item_code", "price_list_rate", "valid_from", "valid_upto"]
        )
        
        for d in price_list_data:
            key = d.item_code
            if key not in price_list_rates:
                price_list_rates[key] = {}
                
            # Get the most recent price if there are multiple entries
            if not price_list_rates[key].get("valid_from") or (
                d.valid_from and price_list_rates[key].get("valid_from") < d.valid_from
            ):
                price_list_rates[key] = {
                    "price_list_rate": d.price_list_rate,
                    "valid_from": d.valid_from,
                    "valid_upto": d.valid_upto
                }
    
    # Get previous prices for price change highlighting
    previous_prices = get_previous_prices(item_codes, price_list)
    
    # Add price data to items
    result = []
    for item in items:
        item_code = item.item_code
        price_data = price_list_rates.get(item_code, {})
        
        item_dict = {
            "item_code": item.item_code,
            "item_name": item.item_name,
            "item_group": item.item_group,
            "description": item.description,
            "image": item.image,
            "price": flt(price_data.get("price_list_rate", item.standard_rate)),
            "old_price": previous_prices.get(item_code),
            "price_updated": is_price_updated_recently(item_code),
            "specifications": get_item_specifications(item_code)
        }
        
        # Check if price is valid based on date range
        valid_from = price_data.get("valid_from")
        valid_upto = price_data.get("valid_upto")
        
        current_datetime = now_datetime()
        if valid_from and get_datetime(valid_from) > current_datetime:
            item_dict["is_price_valid"] = False
        elif valid_upto and get_datetime(valid_upto) < current_datetime:
            item_dict["is_price_valid"] = False
        else:
            item_dict["is_price_valid"] = True
            
        result.append(item_dict)
    
    return result


@frappe.whitelist()
def get_item_categories():
    """
    Get all item categories/groups for filtering
    
    Returns:
        list: List of item group names
    """
    return [d.name for d in frappe.get_all("Item Group", filters={"is_group": 0})]


@frappe.whitelist()
def get_price_lists():
    """
    Get all selling price lists available
    
    Returns:
        list: List of selling price list names
    """
    return [d.name for d in frappe.get_all("Price List", filters={"selling": 1, "enabled": 1})]


def is_price_updated_recently(item_code, days=7):
    """
    Check if the price of an item was updated in the last 'days' days
    
    Args:
        item_code (str): Item code to check
        days (int): Number of days to look back
        
    Returns:
        bool: True if price was updated recently, False otherwise
    """
    latest_price = frappe.get_all(
        "Item Price",
        filters={"item_code": item_code},
        fields=["creation", "modified"],
        order_by="modified desc",
        limit=1
    )
    
    if not latest_price:
        return False
    
    days_ago = frappe.utils.add_days(now_datetime(), -days)
    last_modified = get_datetime(latest_price[0].modified)
    
    return last_modified >= days_ago


def get_previous_prices(item_codes, price_list):
    """
    Get previous prices for items to highlight price changes
    
    Args:
        item_codes (list): List of item codes
        price_list (str): Price list name
        
    Returns:
        dict: Dictionary with item_code as key and previous price as value
    """
    # Get price history from custom table if available, or use price list history
    previous_prices = {}
    
    try:
        # Check if we have a price history doctype
        if frappe.db.exists("DocType", "Price History"):
            for item_code in item_codes:
                history = frappe.get_all(
                    "Price History",
                    filters={"item_code": item_code, "price_list": price_list},
                    fields=["old_price"],
                    order_by="creation desc",
                    limit=1
                )
                if history:
                    previous_prices[item_code] = flt(history[0].old_price)
    except:
        pass
    
    return previous_prices


def get_item_specifications(item_code):
    """
    Get item specifications for comparison features
    
    Args:
        item_code (str): Item code
        
    Returns:
        dict: Dictionary of specification attributes and values
    """
    specs = {}
    
    # Try to get specifications from Item Variant Attributes
    if frappe.db.exists("DocType", "Item Variant Attribute"):
        attributes = frappe.get_all(
            "Item Variant Attribute",
            filters={"parent": item_code},
            fields=["attribute", "attribute_value"]
        )
        
        for attr in attributes:
            specs[attr.attribute] = attr.attribute_value
    
    # Try to get specifications from custom Item Specification DocType if it exists
    try:
        if frappe.db.exists("DocType", "Item Specification"):
            item_specs = frappe.get_all(
                "Item Specification",
                filters={"item": item_code},
                fields=["specification", "value"]
            )
            
            for spec in item_specs:
                specs[spec.specification] = spec.value
    except:
        pass
    
    return specs


@frappe.whitelist()
def get_item_stock_availability(item_code, warehouse=None):
    """
    Get item stock availability for a given warehouse or all warehouses
    
    Args:
        item_code (str): Item code to check
        warehouse (str, optional): Specific warehouse to check
        
    Returns:
        dict: Stock information
    """
    filters = {"item_code": item_code}
    if warehouse:
        filters["warehouse"] = warehouse
    
    bin_data = frappe.get_all(
        "Bin",
        filters=filters,
        fields=["warehouse", "actual_qty", "projected_qty", "reserved_qty"]
    )
    
    result = {
        "available_qty": sum(d.actual_qty for d in bin_data),
        "warehouses": [{
            "warehouse": d.warehouse,
            "actual_qty": d.actual_qty,
            "projected_qty": d.projected_qty,
            "reserved_qty": d.reserved_qty
        } for d in bin_data]
    }
    
    return result


@frappe.whitelist()
def save_offline_changes(changes):
    """
    Process changes made while offline
    
    Args:
        changes (list): List of changes to process
        
    Returns:
        dict: Status of processing
    """
    if not frappe.has_permission("Item Price", "write"):
        frappe.throw(_("Not permitted"), frappe.PermissionError)
    
    changes = frappe.parse_json(changes)
    results = []
    
    for change in changes:
        change_type = change.get("type")
        
        if change_type == "price_update":
            item_code = change.get("item_code")
            price_list = change.get("price_list")
            new_price = flt(change.get("new_price"))
            
            # Validate inputs
            if not frappe.db.exists("Item", item_code):
                results.append({
                    "status": "error",
                    "item_code": item_code,
                    "message": "Invalid Item Code"
                })
                continue
            
            if not frappe.db.exists("Price List", price_list):
                results.append({
                    "status": "error",
                    "item_code": item_code,
                    "message": "Invalid Price List"
                })
                continue
            
            # Check if we need to update an existing price or create a new one
            existing_price = frappe.get_all(
                "Item Price",
                filters={
                    "item_code": item_code,
                    "price_list": price_list,
                    "selling": 1
                },
                limit=1
            )
            
            try:
                if existing_price:
                    # Update existing price
                    doc = frappe.get_doc("Item Price", existing_price[0].name)
                    doc.price_list_rate = new_price
                    doc.save()
                    
                    # Save price history if the doctype exists
                    if frappe.db.exists("DocType", "Price History"):
                        history = frappe.new_doc("Price History")
                        history.item_code = item_code
                        history.price_list = price_list
                        history.old_price = doc.get_value("price_list_rate")
                        history.new_price = new_price
                        history.changed_by = frappe.session.user
                        history.save(ignore_permissions=True)
                else:
                    # Create a new price
                    doc = frappe.new_doc("Item Price")
                    doc.item_code = item_code
                    doc.price_list = price_list
                    doc.selling = 1
                    doc.buying = 0
                    doc.price_list_rate = new_price
                    doc.save()
                
                results.append({
                    "status": "success",
                    "item_code": item_code,
                    "message": "Price updated successfully"
                })
            except Exception as e:
                results.append({
                    "status": "error",
                    "item_code": item_code,
                    "message": str(e)
                })
    
    return {"results": results}


def track_price_change(doc, method=None):
    """
    Track price changes for Item Price documents
    This function is triggered on Item Price update via hooks
    
    Args:
        doc: The document being updated
        method: The method being called (not used)
    """
    if not doc.is_new() and doc.has_value_changed("price_list_rate"):
        try:
            # Check if Price History DocType exists
            if not frappe.db.exists("DocType", "Price History"):
                # Create it if it doesn't exist
                create_price_history_doctype()
            
            # Create price history record
            old_price = doc.get_doc_before_save().price_list_rate if doc.get_doc_before_save() else 0
            
            history = frappe.new_doc("Price History")
            history.item_code = doc.item_code
            history.item_name = frappe.get_value("Item", doc.item_code, "item_name")
            history.price_list = doc.price_list
            history.old_price = old_price
            history.new_price = doc.price_list_rate
            history.changed_by = frappe.session.user
            history.change_date = now_datetime()
            history.save(ignore_permissions=True)
            
            frappe.db.commit()
        except Exception as e:
            frappe.log_error(f"Failed to track price change: {str(e)}")


def clear_old_price_history(days=90):
    """
    Remove price history records older than specified days
    This function is scheduled to run daily via hooks
    
    Args:
        days (int): Number of days to keep history for
    """
    try:
        if frappe.db.exists("DocType", "Price History"):
            cutoff_date = add_days(now_datetime(), -days)
            frappe.db.sql("""
                DELETE FROM `tabPrice History` 
                WHERE change_date < %s
            """, (cutoff_date,))
            frappe.db.commit()
    except Exception as e:
        frappe.log_error(f"Failed to clear price history: {str(e)}")


def create_price_history_doctype():
    """
    Create the Price History DocType if it doesn't exist
    """
    try:
        if not frappe.db.exists("DocType", "Price History"):
            # Create a new DocType for Price History
            doc = frappe.new_doc("DocType")
            doc.name = "Price History"
            doc.module = "Price List"
            doc.custom = 1
            doc.is_submittable = 0
            doc.is_virtual = 0
            doc.is_table = 0
            doc.autoname = "format:PH-{item_code}-{###}"
            doc.naming_rule = "Expression"
            doc.modified_by = frappe.session.user
            doc.owner = frappe.session.user
            
            # Add fields
            doc.fields = [
                {
                    "fieldname": "item_code",
                    "fieldtype": "Link",
                    "label": "Item Code",
                    "options": "Item",
                    "reqd": 1,
                    "in_list_view": 1,
                    "in_standard_filter": 1
                },
                {
                    "fieldname": "item_name",
                    "fieldtype": "Data",
                    "label": "Item Name",
                    "in_list_view": 1
                },
                {
                    "fieldname": "price_list",
                    "fieldtype": "Link",
                    "label": "Price List",
                    "options": "Price List",
                    "reqd": 1,
                    "in_list_view": 1,
                    "in_standard_filter": 1
                },
                {
                    "fieldname": "old_price",
                    "fieldtype": "Currency",
                    "label": "Old Price",
                    "in_list_view": 1
                },
                {
                    "fieldname": "new_price",
                    "fieldtype": "Currency",
                    "label": "New Price",
                    "in_list_view": 1
                },
                {
                    "fieldname": "changed_by",
                    "fieldtype": "Link",
                    "label": "Changed By",
                    "options": "User",
                    "in_standard_filter": 1
                },
                {
                    "fieldname": "change_date",
                    "fieldtype": "Datetime",
                    "label": "Change Date",
                    "in_list_view": 1,
                    "in_standard_filter": 1
                }
            ]
            
            # Set permissions
            doc.permissions = [
                {
                    "role": "System Manager",
                    "read": 1,
                    "write": 1,
                    "create": 1,
                    "delete": 1,
                    "permlevel": 0
                },
                {
                    "role": "Sales Manager",
                    "read": 1,
                    "write": 0,
                    "create": 0,
                    "delete": 0,
                    "permlevel": 0
                }
            ]
            
            doc.save()
            frappe.db.commit()
    except Exception as e:
        frappe.log_error(f"Failed to create Price History DocType: {str(e)}")