import frappe
import json
from frappe import _
from frappe.model.document import get_controller
from frappe.model import no_value_fields


@frappe.whitelist()
def get_data(
    filters: str = None,
    or_filters: str = None,
    order_by: str = None,
    page_length=20,
    page_length_count=20,
    column_field=None,
    title_field=None,
    columns=[],
    rows=["*"],
):

    if filters:
        try:
            filters = json.loads(filters)
        except json.JSONDecodeError:
            frappe.throw(
                "Invalid filters format. It should be a valid JSON string representing a dictionary.")
    if or_filters:
        try:
            or_filters = json.loads(or_filters)
        except json.JSONDecodeError:
            frappe.throw(
                "Invalid or_filters format. It should be a valid JSON string representing a dictionary.")

    allData = (
        frappe.db.get_list(
            'PL Variant',
            fields=rows,
            filters=filters,
            or_filters=or_filters,
            order_by=order_by,
            page_length=page_length,
        )
        or []
    )

    # Loop and get the data from child tables
    mergedData = []
    for data in allData:
        # Get the child table data
        mergedData.append(frappe.get_doc(
            'PL Variant',
            data['name']
        ).as_dict())

    return mergedData


@frappe.whitelist()
def get_category(
    filters: str = None,
    or_filters: dict = None,
    order_by: str = None,
    page_length=20,
    page_length_count=20,
    column_field=None,
    title_field=None,
    columns=[],
    rows=["*"],
):

    if filters:
        try:
            filters = json.loads(filters)
        except json.JSONDecodeError:
            frappe.throw(
                "Invalid filters format. It should be a valid JSON string representing a dictionary.")

    allData = (
        frappe.db.get_list(
            'PL Category',
            fields=rows,
            filters=filters,
            or_filters=or_filters,
            order_by=order_by,
            page_length=page_length,
        )
        or []
    )

    return allData
