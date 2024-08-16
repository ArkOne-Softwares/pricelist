# Copyright (c) 2024, Arkone Softwares and contributors
# For license information, please see license.txt

# import frappe
import frappe
from frappe.model.document import Document


class PLVariant(Document):
    def validate(self):
        self.validate_item()
        self.validate_offer()
    
    def validate_item(self):
        if not self.item:
			frappe.throw("Item is mandatory")
    

