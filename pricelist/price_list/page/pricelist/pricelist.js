frappe.pages["pricelist"].on_page_load = function (wrapper) {
	frappe.ui.make_app_page({
		parent: wrapper,
		title: __("PriceList"),
		single_column: true,
	});
};

frappe.pages["pricelist"].on_page_show = function (wrapper) {
	load_desk_page(wrapper);
};

function load_desk_page(wrapper) {
	let $parent = $(wrapper).find(".layout-main-section");
	$parent.empty();

	frappe.require("pricelist.bundle.js").then(() => {
		frappe.pricelist = new frappe.ui.Pricelist({
			wrapper: $parent,
			page: wrapper.page,
		});
	});
}