# Copyright (c) 2024, Arkone Softwares and contributors
# For license information, please see license.txt

# import frappe
from sys import argv
import frappe
from frappe.model.document import Document


class PLVariant(Document):
    def validate(self):
        sudo_category_value = self.sudo_category
        sudo_item_value = self.sudo_item
        existing_offers_value = self.offers
        existing_options_value = self.options

        def get_create_offer(offer):
            offerDocType = "PL Offer"
            if (offer.type):
                offer.type = get_offer_type(offer.type)
            if (offer.segment):
                offer.segment = get_offer_segment(offer.segment)
            offer_value_exist = frappe.db.get_values(doctype=offerDocType, fieldname="name", filters={
                                                     "type": offer.type, "segment": offer.segment, "value": offer.value, "active": 1, "starts_at": offer.starts_at, "ends_at": offer.ends_at}, as_dict=True, limit=1)
            if not offer_value_exist:
                doc = frappe.new_doc(offerDocType)
                doc.type = offer.type
                doc.segment = offer.segment
                doc.value = offer.value
                doc.starts_at = offer.starts_at
                doc.ends_at = offer.ends_at
                doc.insert()
                return doc.name
            return offer_value_exist[0].name

        def get_create_option(option):
            optionDocType = "PL Options List"
            option_value_exist = frappe.db.exists(
                optionDocType, {"title": option.sudo_option})
            if not option_value_exist:
                doc = frappe.new_doc(optionDocType)
                doc.title = option.sudo_option
                doc.insert()
            return option.sudo_option

        def get_offer_type(offerType):
            offerDocType = "PL Offer Type"
            type_value_exist = frappe.db.exists(
                offerDocType, {"title": offerType})
            if not type_value_exist:
                doc = frappe.new_doc(offerDocType)
                doc.title = offerType
                doc.insert()
            return offerType

        def get_offer_segment(offerSegment):
            offerDocType = "PL Offer Segment"
            segment_value_exist = frappe.db.exists(
                offerDocType, {"title": offerSegment})
            if not segment_value_exist:
                print("segment_value_exist", segment_value_exist)
                doc = frappe.new_doc(offerDocType)
                doc.title = offerSegment
                doc.insert()
            return offerSegment

        if (sudo_category_value):
            categoryDocType = "PL Category"
            cateogy_value_exist = frappe.db.exists(
                categoryDocType, {"title": sudo_category_value})
            if not cateogy_value_exist:
                doc = frappe.new_doc(categoryDocType)
                doc.title = sudo_category_value
                doc.insert()
            self.category = sudo_category_value

        if (sudo_item_value):
            itemDocType = "PL Item"
            item_value_exist = frappe.db.exists(
                itemDocType, {"title": sudo_item_value})
            if not item_value_exist:
                doc = frappe.new_doc(itemDocType)
                doc.title = sudo_item_value
                doc.category = self.category
                doc.insert()
            self.parent_item = sudo_item_value

        if (existing_offers_value):
            for offer in existing_offers_value:
                if not offer.offer:
                    created_offer = get_create_offer(offer)
                    offer.offer = created_offer

        if (existing_options_value):
            for option in existing_options_value:
                if not option.option:
                    if option.sudo_option:
                        created_option = get_create_option(option)
                        option.option = created_option
