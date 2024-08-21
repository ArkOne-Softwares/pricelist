import frappe
import json
from frappe import _
from frappe.model.document import get_controller
from frappe.model import no_value_fields

@frappe.whitelist()
def get_data(
    doctype: str,
    filters: dict = None,
    or_filters: dict = None,
    order_by: str = None,
    page_length=20,
    page_length_count=20,
    column_field=None,
    title_field=None,
    columns=[],
    rows=["*"],
    kanban_columns=[],
    kanban_fields=[],
    view=None,
    default_filters=None,
):
    allData = (
            frappe.db.get_list(
                doctype,
                fields=rows,
                filters=filters,
                or_filters=or_filters,
                order_by=order_by,
                page_length=page_length,
            )
            or []
        )
    
    all_data = []
    
    
    for data in allData:
        data["doctype"] = doctype
        data["name"] = data.get("name")
        
        val = frappe.get_doc(doctype, data.get("name"), rows)
        
        if val:
            all_data.append(val)

    return all_data