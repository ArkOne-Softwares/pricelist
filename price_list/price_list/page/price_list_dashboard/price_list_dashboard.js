frappe.pages["price-list-dashboard"].on_page_load = function (wrapper) {
	frappe.ui.make_app_page({
		parent: wrapper,
		title: __("Price List Dashboard"),
		single_column: true,
	});
};

frappe.pages["price-list-dashboard"].on_page_show = function (wrapper) {
	load_desk_page(wrapper);
};

function load_desk_page(wrapper) {
	let $parent = $(wrapper).find(".layout-main-section");
	$parent.empty();

	frappe.require("price_list_dashboard.bundle.jsx").then(() => {
		frappe.price_list_dashboard = new frappe.ui.PriceListDashboard1({
			wrapper: $parent,
			page: wrapper.page,
		});
	});
}