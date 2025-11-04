import React, { useState, useEffect } from "react";
// import { useAuth } from "../../auth/AuthContext";
// import { useNavigate } from "react-router-dom";

function AddBooks() {
  const [categories, setCategories] = useState([]);
  const [loadingCats, setLoadingCats] = useState(true);
  const [msg, setMsg] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [preview, setPreview] = useState(null);

  // const { isAuthenticated, isAdmin, user, loading } = useAuth();
  // const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    author: "",
    description: "",
    price: "",
    stock: "",
    category: "",
    discountPercent: "",
    isFeautred: false,
    isOnSale: false,
    discountPercentage: false,
    coverImage: null,
  });

 // ✅ Updated useEffect for loading categories
useEffect(() => {
  const loadCats = async () => {
    try {
      const res = await fetch("http://localhost:5000/Category/getCategory", {
        method: "GET",
        credentials: "include",
      });
      
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      
      const data = await res.json();
      console.log("Categories response:", data); // Debug log
      
      // Handle different possible response structures
      if (Array.isArray(data)) {
        setCategories(data);
      } else if (data.categories && Array.isArray(data.categories)) {
        setCategories(data.categories);
      } else if (data.data && Array.isArray(data.data)) {
        setCategories(data.data);
      } else {
        console.warn("Unexpected response structure:", data);
        setCategories([]);
      }
    } catch (error) {
      console.error("Failed to load categories:", error);
      setCategories([]);
    } finally {
      setLoadingCats(false);
    }
  };

  loadCats();
}, []);
  // ✅ Handle input changes
  const onChange = (e) => {
    const { name, type, value, checked, files } = e.target;

    if (type === "file") {
      const file = files?.[0] || null;
      setForm((prev) => ({ ...prev, [name]: file }));
      setPreview(file ? URL.createObjectURL(file) : null);
      return;
    }

    if (type === "checkbox") {
      setForm((prev) => ({ ...prev, [name]: checked }));
      return;
    }

    setForm((prev) => ({ ...prev, [name]: value }));
  };

  // ✅ Handle form submission
  const onSubmit = async (e) => {
    e.preventDefault();
    setMsg(null);

    // Uncomment these if you use authentication
    // if (!isAuthenticated || !isAdmin) {
    //   navigate("/", { replace: true });
    //   return;
    // }

    if (
      !form.title ||
      !form.author ||
      !form.description ||
      !form.price ||
      !form.stock
    ) {
      setMsg("❌ All fields (title, author, description, price, stock) are required.");
      return;
    }

    const fd = new FormData();
    fd.append("title", form.title);
    fd.append("author", form.author);
    fd.append("description", form.description);
    fd.append("price", String(form.price));
    fd.append("stock", String(form.stock));
    fd.append("discountPercent", String(form.discountPercentage));
    if (form.category) fd.append("category", form.category);
    fd.append("isFeautred", String(form.isFeautred));
    fd.append("isOnSale", String(form.isOnSale));
    if (form.coverImage) fd.append("coverImage", form.coverImage);

    try {
      setSubmitting(true);
      const res = await fetch("http://localhost:5000/books/createBook", {
        method: "POST",
        credentials: "include",
        body: fd,
      });

      const data = await res.json().catch(() => ({}));

      if (res.status === 401 || res.status === 403) {
        setMsg("❌ Not authorized");
        // navigate("/", { replace: true });
        return;
      }

      if (!res.ok) {
        throw new Error(data?.error || "Failed to create book");
      }

      setMsg("✅ Book added successfully!");

      setForm({
        title: "",
        author: "",
        description: "",
        price: "",
        stock: "",
        category: "",
        discountPercent: "",
        isFeautred: false,
        isOnSale: false,
        discountPercentage: false,
        coverImage: null,
      });

      setPreview(null);
    } catch (err) {
      setMsg("❌ " + err.message);
    } finally {
      setSubmitting(false);
    }
  };

  // ✅ Render Form
  return (
    <div className="max-w-3xl mx-auto">
      <h2 className="text-xl font-semibold mb-4">Add Book</h2>

      <form
        onSubmit={onSubmit}
        className="bg-white border border-slate-200 rounded-xl p-5 space-y-4"
      >
        <div className="grid md:grid-cols-2 gap-4">
          {/* Title */}
          <div>
            <label className="block text-sm mb-1">Title *</label>
            <input
              name="title"
              value={form.title}
              onChange={onChange}
              className="w-full rounded-lg border border-slate-300 px-3 py-2 outline-none focus:ring-2 focus:ring-slate-300"
              placeholder="Book title"
              required
            />
          </div>

          {/* Author */}
          <div>
            <label className="block text-sm mb-1">Author *</label>
            <input
              name="author"
              value={form.author}
              onChange={onChange}
              className="w-full rounded-lg border border-slate-300 px-3 py-2 outline-none focus:ring-2 focus:ring-slate-300"
              placeholder="Author name"
              required
            />
          </div>

          {/* Price */}
          <div>
            <label className="block text-sm mb-1">Price *</label>
            <input
              type="number"
              name="price"
              min="0"
              step="0.01"
              value={form.price}
              onChange={onChange}
              className="w-full rounded-lg border border-slate-300 px-3 py-2 outline-none focus:ring-2 focus:ring-slate-300"
              placeholder="e.g. 19.99"
              required
            />
          </div>

          {/* Stock */}
          <div>
            <label className="block text-sm mb-1">Stock *</label>
            <input
              type="number"
              name="stock"
              min="0"
              step="1"
              value={form.stock}
              onChange={onChange}
              className="w-full rounded-lg border border-slate-300 px-3 py-2 outline-none focus:ring-2 focus:ring-slate-300"
              placeholder="e.g. 20"
              required
            />
          </div>

          {/* Description */}
          <div className="md:col-span-2">
            <label className="block text-sm mb-1">Description *</label>
            <textarea
              name="description"
              value={form.description}
              onChange={onChange}
              rows={4}
              className="w-full rounded-lg border border-slate-300 px-3 py-2 outline-none focus:ring-2 focus:ring-slate-300"
              placeholder="Write a short description..."
              required
            />
          </div>

          {/* Category */}
          <div>
            <label className="block text-sm mb-1">Category</label>
            <select
              name="category"
              value={form.category}
              onChange={onChange}
              disabled={loadingCats}
              className="w-full rounded-lg border border-slate-300 px-3 py-2 outline-none focus:ring-2 focus:ring-slate-300 bg-white"
            >
              <option value="">
                {loadingCats ? "Loading..." : "Select category"}
              </option>
              {categories?.map((c) => (
                <option key={c._id} value={c._id}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>

          {/* Discount Percent */}
          <div>
            <label className="block text-sm mb-1">Discount Percent</label>
            <input
              type="number"
              name="discountPercent"
              min="0"
              max="100"
              step="1"
              value={form.discountPercent}
              onChange={onChange}
              className="w-full rounded-lg border border-slate-300 px-3 py-2 outline-none focus:ring-2 focus:ring-slate-300"
              placeholder="e.g. 10"
            />
          </div>

          {/* Checkboxes */}
          <div className="flex items-center gap-6 md:col-span-2">
            <label className="inline-flex items-center gap-2">
              <input
                type="checkbox"
                name="isFeautred"
                checked={form.isFeautred}
                onChange={onChange}
                className="h-4 w-4 rounded border-slate-300"
              />
              <span className="text-sm">Featured</span>
            </label>

            <label className="inline-flex items-center gap-2">
              <input
                type="checkbox"
                name="discountPercentage"
                checked={form.discountPercentage}
                onChange={onChange}
                className="h-4 w-4 rounded border-slate-300"
              />
              <span className="text-sm">Discount Percentage</span>
            </label>

            <label className="inline-flex items-center gap-2">
              <input
                type="checkbox"
                name="isOnSale"
                checked={form.isOnSale}
                onChange={onChange}
                className="h-4 w-4 rounded border-slate-300"
              />
              <span className="text-sm">On Sale</span>
            </label>
          </div>

          {/* Cover Image */}
          <div className="md:col-span-2">
            <label className="block text-sm mb-1">Cover Image</label>
            <input
              type="file"
              name="coverImage"
              accept="image/*"
              onChange={onChange}
              className="block w-full text-sm text-slate-600 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-slate-100 file:text-slate-700 hover:file:bg-slate-200"
            />

            {/* Preview */}
            {preview && (
              <div className="mt-3">
                <p className="text-sm text-slate-500 mb-1">Preview:</p>
                <img
                  src={preview}
                  alt="preview"
                  className="h-40 w-40 object-cover rounded-lg border border-slate-200"
                />
              </div>
            )}
          </div>
        </div>

        {/* Submit button */}
        <button
          type="submit"
          disabled={submitting}
          className="inline-flex items-center whitespace-nowrap justify-center rounded-lg bg-slate-900 text-white px-4 py-2 text-sm font-medium hover:bg-slate-800 disabled:opacity-60"
        >
          {submitting ? "Submitting..." : "Create Book"}
        </button>

        {/* Message */}
        {msg && <p className="text-sm mt-2">{msg}</p>}
      </form>
    </div>
  );
}

export default AddBooks;
