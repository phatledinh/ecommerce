import { useState, useEffect } from "react";
import categoryService from "../services/categoryService";

export const useCategory = () => {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchCategories = async () => {
        try {
            setLoading(true);
            const data = await categoryService.getAll();
            setCategories(data || []);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCategories();
    }, []);

    const deleteCategory = async (id) => {
        try {
            await categoryService.delete(id);
            setCategories((prev) => prev.filter((cat) => cat.id !== id));
            return { success: true };
        } catch (err) {
            return { success: false, error: err.message };
        }
    };

    const toggleStatus = async (id) => {
        try {
            await categoryService.toggleStatus(id);
            setCategories((prev) =>
                prev.map((cat) =>
                    cat.id === id ? { ...cat, isActive: !cat.isActive } : cat,
                ),
            );
            return { success: true };
        } catch (err) {
            console.error("Toggle failed", err);
            return { success: false, error: err.message };
        }
    };

    return {
        categories,
        setCategories,
        loading,
        error,
        refresh: fetchCategories,
        deleteCategory,
        toggleStatus,
    };
};
