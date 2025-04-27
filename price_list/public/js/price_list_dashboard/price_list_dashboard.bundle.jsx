import * as React from "react";
import { App } from "./App";
import { createRoot } from "react-dom/client";

// Register service worker for PWA capabilities
if ('serviceWorker' in navigator) {
	window.addEventListener('load', () => {
		navigator.serviceWorker.register('/assets/price_list/js/price_list_dashboard/service-worker.js')
			.then(registration => {
				console.log('ServiceWorker registered: ', registration);
				
				// Check for updates when online
				if (navigator.onLine) {
					registration.update();
				}
				
				// Try to sync when coming back online
				window.addEventListener('online', () => {
					registration.update();
					if ('sync' in registration) {
						registration.sync.register('price-list-sync');
					}
				});
			})
			.catch(error => {
				console.log('ServiceWorker registration failed: ', error);
			});
	});
}

class PriceListDashboard1 {
	constructor({ page, wrapper }) {
		this.$wrapper = $(wrapper);
		this.page = page;

		this.init();
	}

	init() {
		this.setup_page_actions();
		this.setup_app();
		this.setup_offline_indicator();
	}

	setup_page_actions() {
		// Primary actions
		this.page.set_primary_action(__("Sync Now"), () => {
			// Trigger data synchronization
			if (window.frappe.price_list_app && typeof window.frappe.price_list_app.syncData === 'function') {
				window.frappe.price_list_app.syncData();
			} else {
				frappe.msgprint(__("Please wait for the application to initialize."));
			}
		}, "refresh");
		
		// Secondary actions - Filter
		this.page.add_menu_item(__("Filter by Category"), () => {
			if (window.frappe.price_list_app && typeof window.frappe.price_list_app.toggleFilters === 'function') {
				window.frappe.price_list_app.toggleFilters();
			}
		});
		
		// Secondary actions - Select Price List
		this.page.add_menu_item(__("Change Price List"), () => {
			if (!window.frappe.price_list_app || typeof window.frappe.price_list_app.getPriceLists !== 'function') {
				frappe.msgprint(__("Please wait for the application to initialize."));
				return;
			}
			
			// Get available price lists
			const priceLists = window.frappe.price_list_app.getPriceLists();
			if (!priceLists || priceLists.length === 0) {
				frappe.msgprint(__("No price lists available."));
				return;
			}
			
			// Create a dialog to select price list
			const dialog = new frappe.ui.Dialog({
				title: __("Select Price List"),
				fields: [
					{
						fieldname: "price_list",
						fieldtype: "Select",
						label: __("Price List"),
						options: priceLists,
						reqd: 1
					}
				],
				primary_action_label: __("Apply"),
				primary_action: (values) => {
					if (values.price_list && window.frappe.price_list_app.setPriceList) {
						window.frappe.price_list_app.setPriceList(values.price_list);
						dialog.hide();
					}
				}
			});
			
			dialog.show();
		});
		
		// Help action
		this.page.add_menu_item(__("Help"), () => {
			const helpDialog = new frappe.ui.Dialog({
				title: __("Price List Mobile App Help"),
				fields: [
					{
						fieldtype: "HTML",
						options: `
							<div style="padding: 10px 15px;">
								<h4>${__("Offline Usage")}</h4>
								<p>${__("The app works offline! Data is synchronized when you're online.")}</p>
								
								<h4>${__("Search & Filter")}</h4>
								<p>${__("Use the search box to find products by name or code.")}</p>
								<p>${__("Filter products by category using the filter button.")}</p>
								
								<h4>${__("Product Comparison")}</h4>
								<p>${__("Select up to 3 products to compare their specifications.")}</p>
								
								<h4>${__("Sync Data")}</h4>
								<p>${__("Use the Sync button to get the latest prices and product data.")}</p>
							</div>
						`
					}
				]
			});
			
			helpDialog.show();
		});
	}

	setup_app() {
		// Create and mount the React app
		const root = createRoot(this.$wrapper.get(0));
		root.render(<App />);
		this.$price_list_dashboard = root;
		
		// Expose methods for controlling the app via page actions
		window.frappe.price_list_app = {
			syncData: () => {
				// Method will be attached by App component
			},
			toggleFilters: () => {
				// Method will be attached by App component
			},
			getPriceLists: () => {
				// Method will be attached by App component
				return [];
			},
			setPriceList: (priceList) => {
				// Method will be attached by App component
			}
		};
	}
	
	setup_offline_indicator() {
		// Setup offline/online indicator
		const updateOnlineStatus = () => {
			if (navigator.onLine) {
				$('.app-offline-indicator').addClass('hidden');
			} else {
				$('.app-offline-indicator').removeClass('hidden');
			}
		};
		
		window.addEventListener('online', updateOnlineStatus);
		window.addEventListener('offline', updateOnlineStatus);
		
		// Initial state
		if (!navigator.onLine) {
			if (!$('.app-offline-indicator').length) {
				this.page.$title_area.append(
					'<div class="app-offline-indicator" style="margin-left: 10px; color: #ff5858;">' +
					'<i class="fa fa-wifi" style="color: #ff5858;"></i> ' +
					'<span>' + __('Offline') + '</span>' +
					'</div>'
				);
			}
		}
	}
}

frappe.provide("frappe.ui");
frappe.ui.PriceListDashboard1 = PriceListDashboard1;
export default PriceListDashboard1;