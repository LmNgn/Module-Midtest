import { useEffect, useState } from "react";
import { getOne } from "../../api/commonApi";
import { useParams } from "react-router-dom";

const key = "products";

const Product = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [category, setCategory] = useState();
  const getData = async () => {
    try {
      const { data } = await getOne(key, id.trim());
      setProduct(data);
      const categoryRes = await getOne("categories", data.categoryId);
      setCategory(categoryRes.data.title);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData();
  }, [id]);

  if (!product) {
    return (
      <p className="text-center text-gray-500 mt-10">Loading product...</p>
    );
  }

  return (
    <div className="max-w-3xl mx-auto mt-10 p-6 bg-white shadow rounded">
      <div className="flex flex-col md:flex-row gap-6">
        <img
          src={product.thumbnail}
          alt={product.title}
          className="w-full md:w-64 h-auto object-cover rounded"
        />
        <div className="flex-1">
          <h2 className="text-2xl font-bold mb-2">{product.title}</h2>
          <p className="text-gray-700 mb-4">{product.description}</p>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="font-semibold">Price:</span>{" "}
              <span className="text-green-600 font-medium">
                ${product.price}
              </span>
            </div>
            <div>
              <span className="font-semibold">Stock:</span>{" "}
              <span>{product.stock}</span>
            </div>
            <div>
              <span className="font-semibold">Category :</span>{" "}
              <span>{category}</span>
            </div>
            <div>
              <span className="font-semibold">Product ID:</span>{" "}
              <span>{product.id}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;
