import * as React from "react";
import { useState, useEffect, useCallback, useRef } from "react";

// Main App Component
export function App() {
  // State management
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [isOffline, setIsOffline] = useState(!navigator.onLine);
  const [lastSyncTime, setLastSyncTime] = useState(null);
  const [priceList, setPriceList] = useState('Standard Selling');
  const [availablePriceLists, setAvailablePriceLists] = useState([]);
  const [compareMode, setCompareMode] = useState(false);
  const [productsToCompare, setProductsToCompare] = useState([]);
  const [showFilters, setShowFilters] = useState(false);
  
  // Reference to preserve methods between renders
  const methodsRef = useRef({
    syncData: null,
    toggleFilters: null,
    getPriceLists: null,
    setPriceList: null
  });
  
  // Handle online/offline status
  useEffect(() => {
    const handleOnlineStatus = () => {
      setIsOffline(!navigator.onLine);
      if (navigator.onLine) {
        syncData();
      }
    };
    
    window.addEventListener('online', handleOnlineStatus);
    window.addEventListener('offline', handleOnlineStatus);
    
    return () => {
      window.removeEventListener('online', handleOnlineStatus);
      window.removeEventListener('offline', handleOnlineStatus);
    };
  }, []);
  
  // Fetch initial data
  useEffect(() => {
    fetchData();
  }, []);
  
  // Apply filters when search query or category changes
  useEffect(() => {
    applyFilters();
  }, [searchQuery, selectedCategory, products]);
  
  // Expose methods to parent Frappe component
  useEffect(() => {
    // Define methods that should be accessible from outside
    methodsRef.current = {
      syncData: () => {
        syncData();
      },
      toggleFilters: () => {
        setShowFilters(prev => !prev);
      },
      getPriceLists: () => {
        return availablePriceLists;
      },
      setPriceList: (newPriceList) => {
        setPriceList(newPriceList);
        fetchData(newPriceList);
      }
    };
    
    // Attach methods to global object for external access
    if (window.frappe && window.frappe.price_list_app) {
      window.frappe.price_list_app.syncData = methodsRef.current.syncData;
      window.frappe.price_list_app.toggleFilters = methodsRef.current.toggleFilters;
      window.frappe.price_list_app.getPriceLists = methodsRef.current.getPriceLists;
      window.frappe.price_list_app.setPriceList = methodsRef.current.setPriceList;
    }
    
    return () => {
      // Clean up on unmount
      if (window.frappe && window.frappe.price_list_app) {
        window.frappe.price_list_app.syncData = () => {};
        window.frappe.price_list_app.toggleFilters = () => {};
        window.frappe.price_list_app.getPriceLists = () => [];
        window.frappe.price_list_app.setPriceList = () => {};
      }
    };
  }, [availablePriceLists, products]);
  
  // Function to fetch data from the server or cache
  const fetchData = async (currentPriceList = priceList) => {
    setLoading(true);
    try {
      if (navigator.onLine) {
        // Fetch from server
        const products = await fetchProductsFromServer(currentPriceList);
        const categories = await fetchCategoriesFromServer();
        const priceLists = await fetchPriceListsFromServer();
        
        // Store in local cache for offline use
        storeInLocalCache('products', products);
        storeInLocalCache('categories', categories);
        storeInLocalCache('priceLists', priceLists);
        storeInLocalCache('lastSyncTime', new Date().toISOString());
        storeInLocalCache('currentPriceList', currentPriceList);
        
        setProducts(products);
        setFilteredProducts(products);
        setCategories(categories);
        setAvailablePriceLists(priceLists);
        setLastSyncTime(new Date().toISOString());
      } else {
        // Get from local cache
        const cachedProducts = getFromLocalCache('products') || [];
        const cachedCategories = getFromLocalCache('categories') || [];
        const cachedPriceLists = getFromLocalCache('priceLists') || ['Standard Selling'];
        const cachedLastSyncTime = getFromLocalCache('lastSyncTime');
        const cachedPriceList = getFromLocalCache('currentPriceList') || 'Standard Selling';
        
        setProducts(cachedProducts);
        setFilteredProducts(cachedProducts);
        setCategories(cachedCategories);
        setAvailablePriceLists(cachedPriceLists);
        setPriceList(cachedPriceList);
        setLastSyncTime(cachedLastSyncTime);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      frappe.throw(__("Failed to load price list data. Please try again."));
      
      // Try to load from cache even if server fetch fails
      const cachedProducts = getFromLocalCache('products') || [];
      const cachedCategories = getFromLocalCache('categories') || [];
      const cachedPriceLists = getFromLocalCache('priceLists') || ['Standard Selling'];
      const cachedLastSyncTime = getFromLocalCache('lastSyncTime');
      
      setProducts(cachedProducts);
      setFilteredProducts(cachedProducts);
      setCategories(cachedCategories);
      setAvailablePriceLists(cachedPriceLists);
      setLastSyncTime(cachedLastSyncTime);
    } finally {
      setLoading(false);
    }
  };
  
  // Synchronize data with the server when online
  const syncData = async () => {
    if (!navigator.onLine) {
      frappe.show_alert({
        message: __('You are currently offline. Data will sync when you are back online.'),
        indicator: 'orange'
      });
      return;
    }
    
    frappe.show_alert({
      message: __('Synchronizing data...'),
      indicator: 'blue'
    });
    
    try {
      const products = await fetchProductsFromServer();
      const categories = await fetchCategoriesFromServer();
      const priceLists = await fetchPriceListsFromServer();
      
      storeInLocalCache('products', products);
      storeInLocalCache('categories', categories);
      storeInLocalCache('priceLists', priceLists);
      storeInLocalCache('lastSyncTime', new Date().toISOString());
      storeInLocalCache('currentPriceList', priceList);
      
      setProducts(products);
      setFilteredProducts(products);
      setCategories(categories);
      setAvailablePriceLists(priceLists);
      setLastSyncTime(new Date().toISOString());
      
      // Re-apply filters
      applyFilters(products);
      
      frappe.show_alert({
        message: __('Data synchronized successfully!'),
        indicator: 'green'
      });
    } catch (error) {
      console.error("Error during synchronization:", error);
      frappe.show_alert({
        message: __('Synchronization failed. Please try again.'),
        indicator: 'red'
      });
    }
  };
  
  // API calls
  const fetchProductsFromServer = async (currentPriceList = priceList) => {
    return new Promise((resolve, reject) => {
      frappe.call({
        method: "price_list.api.price_list.get_items_with_prices",
        args: { 
          price_list: currentPriceList,
          item_group: selectedCategory
        },
        callback: (response) => {
          if (response.message) {
            resolve(response.message);
          } else {
            reject(new Error("Failed to fetch products"));
          }
        },
        error: (err) => reject(err)
      });
    });
  };
  
  const fetchCategoriesFromServer = async () => {
    return new Promise((resolve, reject) => {
      frappe.call({
        method: "price_list.api.price_list.get_item_categories",
        callback: (response) => {
          if (response.message) {
            resolve(response.message);
          } else {
            reject(new Error("Failed to fetch categories"));
          }
        },
        error: (err) => reject(err)
      });
    });
  };
  
  const fetchPriceListsFromServer = async () => {
    return new Promise((resolve, reject) => {
      frappe.call({
        method: "price_list.api.price_list.get_price_lists",
        callback: (response) => {
          if (response.message) {
            resolve(response.message);
          } else {
            reject(new Error("Failed to fetch price lists"));
          }
        },
        error: (err) => reject(err)
      });
    });
  };
  
  // Local storage utilities for offline mode
  const storeInLocalCache = (key, data) => {
    try {
      localStorage.setItem(`price_list_${key}`, JSON.stringify(data));
    } catch (error) {
      console.error(`Error storing ${key} in cache:`, error);
    }
  };
  
  const getFromLocalCache = (key) => {
    try {
      const data = localStorage.getItem(`price_list_${key}`);
      return data ? JSON.parse(data) : null;
    } catch (error) {
      console.error(`Error retrieving ${key} from cache:`, error);
      return null;
    }
  };
  
  // Filter products based on search query and category
  const applyFilters = (productsList = products) => {
    let filtered = [...productsList];
    
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(product => 
        product.item_name.toLowerCase().includes(query) || 
        product.item_code.toLowerCase().includes(query) ||
        (product.description && product.description.toLowerCase().includes(query))
      );
    }
    
    if (selectedCategory) {
      filtered = filtered.filter(product => 
        product.item_group === selectedCategory
      );
    }
    
    setFilteredProducts(filtered);
  };
  
  // Handle product selection for comparison
  const toggleProductForComparison = (product) => {
    if (productsToCompare.some(p => p.item_code === product.item_code)) {
      setProductsToCompare(productsToCompare.filter(p => p.item_code !== product.item_code));
      
      // If no products left for comparison, exit compare mode
      if (productsToCompare.length <= 1) {
        setCompareMode(false);
      }
    } else {
      if (productsToCompare.length < 3) { // Limit to 3 products for comparison
        setProductsToCompare([...productsToCompare, product]);
      } else {
        frappe.show_alert({
          message: __('You can compare up to 3 products at a time'),
          indicator: 'yellow'
        });
      }
    }
  };
  
  // Change current price list
  const handlePriceListChange = (newPriceList) => {
    setPriceList(newPriceList);
    fetchData(newPriceList); // Refresh data with new price list
  };
  
  // Format price with proper currency symbol
  const formatPrice = (price, currency = '₹') => {
    if (!price) return `${currency} 0.00`;
    return `${currency} ${parseFloat(price).toFixed(2)}`;
  };
  
  // Fetch stock availability for a product
  const fetchStockAvailability = async (itemCode) => {
    return new Promise((resolve, reject) => {
      frappe.call({
        method: "price_list.api.price_list.get_item_stock_availability",
        args: { item_code: itemCode },
        callback: (response) => {
          if (response.message) {
            resolve(response.message);
          } else {
            reject(new Error("Failed to fetch stock information"));
          }
        },
        error: (err) => reject(err)
      });
    });
  };
  
  // Show product details
  const showProductDetails = async (product) => {
    try {
      const stockInfo = await fetchStockAvailability(product.item_code);
      
      const dialog = new frappe.ui.Dialog({
        title: product.item_name,
        fields: [
          {
            fieldtype: "HTML",
            fieldname: "product_detail",
            options: `
              <div class="product-detail-container">
                <div class="product-image-container">
                  ${product.image ? 
                    `<img src="${product.image}" alt="${product.item_name}" class="product-detail-image"/>` : 
                    `<div class="product-image-placeholder"><span>${product.item_name[0]}</span></div>`
                  }
                </div>
                <div class="product-info">
                  <h4>${product.item_code}</h4>
                  <div class="product-price-container">
                    <span class="product-price">${formatPrice(product.price)}</span>
                    ${product.old_price && product.old_price > product.price ? 
                      `<span class="product-old-price">${formatPrice(product.old_price)}</span>` : ''
                    }
                    ${product.price_updated ? 
                      `<span class="price-updated-tag">${__('Recently Updated')}</span>` : ''
                    }
                  </div>
                  <p class="product-description">${product.description || __('No description available')}</p>
                  
                  <h5>${__('Stock Information')}</h5>
                  <p>${__('Available Quantity')}: ${stockInfo.available_qty}</p>
                  
                  <h5>${__('Specifications')}</h5>
                  <div class="specifications-list">
                    ${product.specifications && Object.keys(product.specifications).length > 0 ? 
                      Object.entries(product.specifications).map(([key, value]) => 
                        `<div class="spec-item">
                          <span class="spec-label">${key}:</span>
                          <span class="spec-value">${value}</span>
                        </div>`
                      ).join('') : 
                      `<p>${__('No specifications available')}</p>`
                    }
                  </div>
                </div>
              </div>
            `
          }
        ]
      });
      
      dialog.show();
    } catch (error) {
      console.error("Error fetching product details:", error);
      frappe.show_alert({
        message: __('Failed to load product details'),
        indicator: 'red'
      });
    }
  };
  
  // Render the product list
  const renderProductList = () => {
    if (loading) {
      return (
        <div className="text-center p-4">
          <div className="spinner"></div>
          <p>{__('Loading products...')}</p>
        </div>
      );
    }
    
    if (filteredProducts.length === 0) {
      return (
        <div className="text-center p-4">
          <p>{__('No products found matching your criteria.')}</p>
        </div>
      );
    }
    
    return (
      <div className="product-grid">
        {filteredProducts.map(product => (
          <div className="product-card" key={product.item_code}>
            {product.image ? (
              <img src={product.image} alt={product.item_name} className="product-image" />
            ) : (
              <div className="product-image-placeholder">
                <span>{product.item_name[0]}</span>
              </div>
            )}
            <div className="product-details">
              <h3 className="product-name">{product.item_name}</h3>
              <p className="product-code">{product.item_code}</p>
              <p className="product-price">{formatPrice(product.price)}</p>
              {product.old_price && product.old_price > product.price && (
                <p className="product-old-price">{formatPrice(product.old_price)}</p>
              )}
              <div className="product-actions">
                <button 
                  className={`btn btn-sm ${productsToCompare.some(p => p.item_code === product.item_code) ? 'btn-info' : 'btn-default'}`} 
                  onClick={() => toggleProductForComparison(product)}
                >
                  {productsToCompare.some(p => p.item_code === product.item_code) ? 
                    <><i className="fa fa-check"></i> {__('Selected')}</> : 
                    <><i className="fa fa-columns"></i> {__('Compare')}</>}
                </button>
                <button className="btn btn-sm btn-primary" onClick={() => showProductDetails(product)}>
                  <i className="fa fa-info-circle"></i> {__('Details')}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  };
  
  // Render product comparison view
  const renderComparisonView = () => {
    if (productsToCompare.length === 0) {
      return (
        <div className="text-center p-4">
          <p>{__('Select products to compare')}</p>
        </div>
      );
    }
    
    // Get all unique specs from all products
    const allSpecs = {};
    productsToCompare.forEach(product => {
      if (product.specifications) {
        Object.keys(product.specifications).forEach(key => {
          allSpecs[key] = true;
        });
      }
    });
    const specKeys = Object.keys(allSpecs);
    
    return (
      <div className="comparison-container">
        <div className="comparison-actions">
          <button 
            className="btn btn-sm btn-danger" 
            onClick={() => {
              setProductsToCompare([]);
              setCompareMode(false);
            }}
          >
            <i className="fa fa-times"></i> {__('Clear Comparison')}
          </button>
          <button 
            className="btn btn-sm btn-default" 
            onClick={() => setCompareMode(false)}
          >
            <i className="fa fa-arrow-left"></i> {__('Back to Products')}
          </button>
        </div>
        
        <div className="comparison-table-wrapper">
          <table className="comparison-table">
            <thead>
              <tr>
                <th>{__('Feature')}</th>
                {productsToCompare.map(product => (
                  <th key={product.item_code}>
                    {product.item_name}
                    <button 
                      className="btn btn-xs btn-danger ml-2" 
                      onClick={() => toggleProductForComparison(product)}
                    >
                      <i className="fa fa-times"></i>
                    </button>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{__('Item Code')}</td>
                {productsToCompare.map(product => (
                  <td key={product.item_code}>{product.item_code}</td>
                ))}
              </tr>
              <tr>
                <td>{__('Price')}</td>
                {productsToCompare.map(product => (
                  <td key={product.item_code} className="price-cell">
                    {formatPrice(product.price)}
                    {product.old_price && product.old_price > product.price && (
                      <span className="comparison-old-price">{formatPrice(product.old_price)}</span>
                    )}
                  </td>
                ))}
              </tr>
              {specKeys.map(spec => (
                <tr key={spec}>
                  <td>{spec}</td>
                  {productsToCompare.map(product => (
                    <td key={product.item_code}>
                      {product.specifications?.[spec] || '-'}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  };

  return (
    <div className="price-list-app">
      {/* Offline indicator */}
      {isOffline && (
        <div className="offline-banner">
          <span>
            <i className="fa fa-wifi"></i> {__('You are offline. Working with data from')} {lastSyncTime ? new Date(lastSyncTime).toLocaleString() : __('previous session')}
          </span>
        </div>
      )}
      
      {/* Header with search and filters */}
      <header className="app-header">
        <div className="search-container">
          <input
            type="text"
            className="form-control search-input"
            placeholder={__('Search products...')}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button 
            className="btn btn-default filter-btn" 
            onClick={() => setShowFilters(!showFilters)}
          >
            <i className="fa fa-filter"></i>
          </button>
        </div>
        
        {showFilters && (
          <div className="filters-panel">
            <div className="filter-group">
              <label>{__('Category')}</label>
              <select 
                className="form-control"
                value={selectedCategory || ''}
                onChange={(e) => setSelectedCategory(e.target.value || null)}
              >
                <option value="">{__('All Categories')}</option>
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>
            
            <div className="filter-group">
              <label>{__('Price List')}</label>
              <select 
                className="form-control"
                value={priceList}
                onChange={(e) => handlePriceListChange(e.target.value)}
              >
                {availablePriceLists.map(pl => (
                  <option key={pl} value={pl}>{pl}</option>
                ))}
              </select>
            </div>
          </div>
        )}
        
        <div className="action-buttons">
          <button 
            className="btn btn-default" 
            onClick={() => syncData()}
            disabled={isOffline}
          >
            <i className="fa fa-refresh"></i> {__('Sync')}
          </button>
          <button 
            className={`btn ${compareMode ? 'btn-primary' : 'btn-default'}`}
            onClick={() => setCompareMode(!compareMode)}
            disabled={productsToCompare.length === 0}
          >
            <i className="fa fa-columns"></i> {__('Compare')} 
            {productsToCompare.length > 0 && ` (${productsToCompare.length})`}
          </button>
        </div>
      </header>
      
      {/* Main content */}
      <main className="app-content">
        {compareMode ? renderComparisonView() : renderProductList()}
      </main>
    </div>
  );
}