# Copyright (c) 2024, Arkone Softwares and contributors
# For license information, please see license.txt

# import frappe
from sys import argv
import frappe
from frappe.model.document import Document


class PLVariant(Document):
    def before_insert(self):
        category_value = self.sudo_category
        categoryDocType = "PL Category"

        # Check if the category value exists in the PL Category doctype
        cateogy_value_exist = frappe.db.exists(
            categoryDocType, {"title": category_value})
        if not cateogy_value_exist:
            doc = frappe.new_doc(categoryDocType)
            doc.title = category_value
            doc.insert()
        self.category = category_value

        # Check if parent item exists then create a new item else use the existing item
        # parent_item = self.sudo_parent_item
        # itemDocType = "Item"
        # parent_item_exist = frappe.db.exists(itemDocType, {"item_code": parent_item})
        # if not parent_item_exist:
        #     doc = frappe.new_doc(itemDocType)
        #     doc.item_code = parent_item
        #     doc.insert()
        # self.item = parent_item

    # def validate_offer(self):
    #     if not self.offer:
    #         frappe.throw("Offer is mandatory")
