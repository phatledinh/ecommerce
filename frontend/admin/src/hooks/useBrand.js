import { useState, useEffect, useCallback } from "react";
import brandService from "../services/brandService";

export const useBrand = () => {
    const [brands, setBrands] = useState([]);
    const [meta, setMeta] = useState({});
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchBrands = useCallback(async (params = { page: 1, size: 100 }) => {
        setLoading(true);
        try {
            const res = await brandService.getAll(params);
            const rawData = res.result || [];

            const formattedData = rawData.map((brand) => ({
                ...brand,
                isActive: brand.isActive ?? brand.is_active,
                productCount: brand.productCount ?? 0,
                createdAt: brand.createdAt,
            }));

            setBrands(formattedData);
            setMeta(res.meta || {});
            setError(null);
        } catch (err) {
            console.error(err);
            setError(err.message || "Lỗi khi tải danh sách");
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchBrands();
    }, [fetchBrands]);

    const getBrand = async (id) => {
        setLoading(true);
        try {
            const data = await brandService.getById(id);
            return {
                ...data,
                isActive: data.is_active ?? data.isActive,
            };
        } catch (err) {
            setError(err.message);
            return null;
        } finally {
            setLoading(false);
        }
    };

    const buildFormData = (data) => {
        const formData = new FormData();
        Object.keys(data).forEach((key) => {
            if (data[key] !== null && data[key] !== undefined) {
                if (key === "logoFile" && data[key] instanceof File) {
                    formData.append("logoFile", data[key]);
                } else if (key !== "logo" && key !== "logoFile") {
                    formData.append(key, data[key]);
                }
            }
        });
        return formData;
    };

    const createBrand = async (data) => {
        setLoading(true);
        try {
            const formData = buildFormData(data);
            const response = await brandService.create(formData);
            await fetchBrands();
            return { success: true, data: response };
        } catch (err) {
            return {
                success: false,
                error: err.response?.data?.message || err.message,
            };
        } finally {
            setLoading(false);
        }
    };

    const updateBrand = async (id, data) => {
        setLoading(true);
        try {
            const formData = buildFormData(data);
            const response = await brandService.update(id, formData);
            await fetchBrands();
            return { success: true, data: response };
        } catch (err) {
            return {
                success: false,
                error: err.response?.data?.message || err.message,
            };
        } finally {
            setLoading(false);
        }
    };

    const toggleBrandStatus = async (id) => {
        try {
            await brandService.toggleStatus(id);
            setBrands((prev) =>
                prev.map((b) =>
                    b.id === id ? { ...b, isActive: !b.isActive } : b,
                ),
            );
            return { success: true };
        } catch (err) {
            return { success: false, error: err.message };
        }
    };

    const deleteBrand = async (id) => {
        try {
            await brandService.delete(id);
            setBrands((prev) => prev.filter((brand) => brand.id !== id));
            return { success: true };
        } catch (err) {
            return { success: false, error: err.message };
        }
    };

    return {
        brands,
        loading,
        error,
        fetchBrands,
        getBrand,
        createBrand,
        updateBrand,
        deleteBrand,
        toggleBrandStatus,
        meta,
    };
};
