import { motion, AnimatePresence } from 'framer-motion';
import { X, Loader, Save, UploadCloud, ImagePlus, Trash2 } from 'lucide-react';

function getImageList(images) {
  return String(images || '')
    .split(',')
    .map((item) => item.trim())
    .filter(Boolean);
}

export function ProductEditModal({ isOpen, product, form, onChange, onUploadImages, onRemoveImage, onSave, onClose, loading, uploadingImages }) {
  const imageList = getImageList(form.images);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
          >
            <div className="w-full max-w-2xl max-h-[90vh] rounded-[28px] border border-white/8 bg-linear-to-br from-white/8 to-white/4 backdrop-blur-xl shadow-2xl overflow-hidden flex flex-col">
              {/* Header */}
              <div className="flex items-center justify-between border-b border-white/8 p-6 bg-white/5">
                <div>
                  <h2 className="text-xl font-semibold text-foreground">
                    {product?.id || product?._id ? 'Edit Product' : 'Create Product'}
                  </h2>
                  {product?.id && <p className="mt-1 text-sm text-secondary-text">ID: {product.id}</p>}
                </div>
                <button
                  onClick={onClose}
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/8 bg-white/5 text-secondary-text hover:bg-white/10 hover:text-foreground transition-material"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Content */}
              <form onSubmit={onSave} className="flex-1 overflow-y-auto p-6 space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <label className="block">
                    <span className="mb-2 block text-xs uppercase tracking-[0.2em] text-outline">Name *</span>
                    <input
                      required
                      value={form.name}
                      onChange={(e) => onChange('name', e.target.value)}
                      className="w-full rounded-2xl border border-white/8 bg-black/20 px-4 py-3 text-sm text-foreground outline-none focus:border-primary/40 focus:ring-2 focus:ring-primary/20"
                    />
                  </label>
                  <label className="block">
                    <span className="mb-2 block text-xs uppercase tracking-[0.2em] text-outline">Category *</span>
                    <input
                      required
                      value={form.category}
                      onChange={(e) => onChange('category', e.target.value)}
                      className="w-full rounded-2xl border border-white/8 bg-black/20 px-4 py-3 text-sm text-foreground outline-none focus:border-primary/40 focus:ring-2 focus:ring-primary/20"
                    />
                  </label>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <label className="block">
                    <span className="mb-2 block text-xs uppercase tracking-[0.2em] text-outline">Price *</span>
                    <input
                      required
                      type="number"
                      step="0.01"
                      value={form.price}
                      onChange={(e) => onChange('price', e.target.value)}
                      className="w-full rounded-2xl border border-white/8 bg-black/20 px-4 py-3 text-sm text-foreground outline-none focus:border-primary/40 focus:ring-2 focus:ring-primary/20"
                    />
                  </label>
                  <label className="block">
                    <span className="mb-2 block text-xs uppercase tracking-[0.2em] text-outline">Stock Qty</span>
                    <input
                      type="number"
                      value={form.stockQty}
                      onChange={(e) => onChange('stockQty', e.target.value)}
                      className="w-full rounded-2xl border border-white/8 bg-black/20 px-4 py-3 text-sm text-foreground outline-none focus:border-primary/40 focus:ring-2 focus:ring-primary/20"
                    />
                  </label>
                </div>

                <label className="block">
                  <span className="mb-2 block text-xs uppercase tracking-[0.2em] text-outline">Description *</span>
                  <textarea
                    required
                    rows={4}
                    value={form.description}
                    onChange={(e) => onChange('description', e.target.value)}
                    className="w-full rounded-2xl border border-white/8 bg-black/20 px-4 py-3 text-sm text-foreground outline-none focus:border-primary/40 focus:ring-2 focus:ring-primary/20"
                  />
                </label>

                <div className="rounded-3xl border border-white/8 bg-black/20 p-4 space-y-4">
                  <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <p className="text-sm font-semibold text-foreground">Product images</p>
                      <p className="text-xs text-secondary-text">Upload one or more images to Cloudinary.</p>
                    </div>
                    <label className="inline-flex cursor-pointer items-center gap-2 rounded-full border border-white/8 bg-white/5 px-4 py-2 text-xs font-semibold text-foreground hover:bg-white/10 transition-material">
                      <UploadCloud size={14} />
                      {uploadingImages ? 'Uploading...' : 'Choose files'}
                      <input
                        type="file"
                        accept="image/*"
                        multiple
                        className="hidden"
                        disabled={uploadingImages}
                        onChange={(e) => onUploadImages?.(e.target.files)}
                      />
                    </label>
                  </div>

                  <label className="block">
                    <span className="mb-2 block text-xs uppercase tracking-[0.2em] text-outline">Image URLs</span>
                    <textarea
                      rows={3}
                      value={form.images}
                      onChange={(e) => onChange('images', e.target.value)}
                      placeholder="Paste Cloudinary URLs separated by commas"
                      className="w-full rounded-2xl border border-white/8 bg-black/20 px-4 py-3 text-sm text-foreground outline-none focus:border-primary/40 focus:ring-2 focus:ring-primary/20"
                    />
                  </label>

                  {imageList.length > 0 ? (
                    <div className="grid gap-3 sm:grid-cols-2">
                      {imageList.map((src, index) => (
                        <div key={`${src}-${index}`} className="group overflow-hidden rounded-2xl border border-white/8 bg-white/5">
                          <div className="relative aspect-4/3 bg-black/20">
                            <img
                              src={src}
                              alt={`Product ${index + 1}`}
                              className="h-full w-full object-cover"
                              onError={(e) => {
                                e.currentTarget.src = 'https://placehold.co/600x450/1a1a1a/666?text=Image+Unavailable';
                              }}
                            />
                            <button
                              type="button"
                              onClick={() => onRemoveImage?.(index)}
                              className="absolute right-2 top-2 inline-flex h-8 w-8 items-center justify-center rounded-full bg-black/60 text-white opacity-90 transition hover:bg-red-500"
                              title="Remove image"
                            >
                              <Trash2 size={14} />
                            </button>
                          </div>
                          <div className="flex items-center gap-2 px-3 py-2 text-xs text-secondary-text">
                            <ImagePlus size={12} />
                            <span className="truncate">{src}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="rounded-2xl border border-dashed border-white/10 bg-white/4 p-5 text-center text-sm text-secondary-text">
                      No images yet. Upload photos or paste Cloudinary URLs.
                    </div>
                  )}
                </div>
              </form>

              {/* Footer */}
              <div className="border-t border-white/8 bg-white/5 p-6 flex gap-3">
                <button
                  onClick={onClose}
                  className="inline-flex flex-1 items-center justify-center gap-2 rounded-full border border-white/8 bg-white/5 px-4 py-3 text-sm font-semibold text-foreground hover:bg-white/10 transition-material"
                >
                  Cancel
                </button>
                <button
                  onClick={onSave}
                  disabled={loading}
                  className="inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-primary px-4 py-3 text-sm font-semibold text-white shadow-soft hover:bg-primary-light transition-material disabled:opacity-60"
                >
                  {loading ? <Loader size={16} className="animate-spin" /> : <Save size={16} />}
                  {product?.id || product?._id ? 'Update' : 'Create'}
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
