import { useEffect, useState } from "react";
import { useQuotes } from "./QuoteContext";

interface Product {
  id: number;
  title: string;
  description: string;
  thumbnail: string;
}

const Catalog = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [message, setMessage] = useState("");

  const { addRequest } = useQuotes();

  useEffect(() => {
    fetch("https://dummyjson.com/products")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data.products);
      });
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Product Catalog</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {products.map((product) => (
          <div key={product.id} className="bg-[#1a1a1a] p-4 rounded shadow-md">
            <img
              src={product.thumbnail}
              alt={product.title}
              className="w-full h-40 object-cover rounded mb-4"
            />
            <h2 className="text-lg font-semibold">{product.title}</h2>
            <p className="text-sm text-gray-400 mb-2">
              {product.description.slice(0, 60)}...
            </p>
            <button
              onClick={() => {
                setSelectedProduct(product);
                setShowModal(true);
              }}
              className="mt-2 bg-white text-black font-medium py-2 px-4 rounded hover:bg-gray-300"
            >
              Request Quote
            </button>
          </div>
        ))}
      </div>

      {/* Quote Modal */}
      {showModal && selectedProduct && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-[#1a1a1a] text-white p-6 rounded w-full max-w-md shadow-lg">
            <h2 className="text-xl font-bold mb-4">Request Quote</h2>
            <img
              src={selectedProduct.thumbnail}
              alt={selectedProduct.title}
              className="w-full h-40 object-cover rounded mb-4"
            />
            <h3 className="text-lg font-semibold mb-2">
              {selectedProduct.title}
            </h3>

            <label className="block mb-2 text-sm">Quantity:</label>
            <input
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
              className="w-full bg-[#0a0a0a] border border-gray-600 rounded p-2 mb-4"
            />

            <label className="block mb-2 text-sm">Message:</label>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Optional notes..."
              className="w-full bg-[#0a0a0a] border border-gray-600 rounded p-2 mb-4"
            />

            <div className="flex justify-between">
              <button
                onClick={() => {
                  addRequest({
                    title: selectedProduct.title,
                    thumbnail: selectedProduct.thumbnail,
                    quantity,
                    message,
                  });
                  setShowModal(false);
                  setQuantity(1);
                  setMessage("");
                }}
                className="bg-white text-black px-4 py-2 rounded hover:bg-gray-300"
              >
                Submit
              </button>
              <button
                onClick={() => setShowModal(false)}
                className="text-red-400 hover:text-red-300 font-medium"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Catalog;
