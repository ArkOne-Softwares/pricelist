import frappe
import json
from frappe import _
from frappe.model.document import get_controller
from frappe.model import no_value_fields


@frappe.whitelist()
def get_data(
    filters: dict = None,
    or_filters: dict = None,
    order_by: str = None,
    page_length=20,
    page_length_count=20,
    column_field=None,
    title_field=None,
    columns=[],
    rows=["*"],
):
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

    return allData


@frappe.whitelist()
def get_category(
    filters: dict = None,
    or_filters: dict = None,
    order_by: str = None,
    page_length=20,
    page_length_count=20,
    column_field=None,
    title_field=None,
    columns=[],
    rows=["*"],
):
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
