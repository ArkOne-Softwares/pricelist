# Copyright (c) 2024, Arkone Softwares and contributors
# For license information, please see license.txt

# import frappe
from frappe.model.document import Document


class PLOfferToDocType(Document):
	def before_insert(self):
		print("offer_to_doc_type", self.offer)
		print("offer_to_doc_type", self.parent)
		print("offer_to_doc_type", self.parenttype)
