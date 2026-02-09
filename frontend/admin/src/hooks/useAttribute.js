import { useState, useCallback } from "react";
import attributeService from "../services/attributeService";

// Helper chuyển đổi từ Backend DTO (camelCase) sang Frontend State (snake_case)
const mapToFrontend = (data) => ({
    ...data,
    input_type: data.inputType,
    data_type: data.dataType,
    is_required: data.isRequired,
    is_variant: data.isVariant,
    is_filterable: data.isFilterable,
    // Map options nếu có
    options:
        data.options?.map((opt) => ({
            ...opt,
            display_name: opt.displayName,
            sort_order: opt.sortOrder,
        })) || [],
});

// Helper chuyển đổi từ Frontend State sang Backend DTO
const mapToBackend = (data) => ({
    id: data.id,
    code: data.code,
    name: data.name,
    unit: data.unit,
    inputType: data.input_type,
    dataType: data.data_type,
    isRequired: data.is_required,
    isVariant: data.is_variant,
    isFilterable: data.is_filterable,
    options: data.options?.map((opt) => ({
        id: opt.id > 1000000000000 ? null : opt.id, // Nếu ID là timestamp (tạm) thì set null để BE tạo mới
        value: opt.value,
        displayName: opt.display_name,
        sortOrder: opt.sort_order,
    })),
});

export const useAttribute = () => {
    const [attributes, setAttributes] = useState([]);
    const [attribute, setAttribute] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // Lấy danh sách
    const fetchAttributes = useCallback(async () => {
        setLoading(true);
        try {
            const data = await attributeService.getAll();
            // Map list data
            const mappedData = data.map(mapToFrontend);
            setAttributes(mappedData);
            setError(null);
        } catch (err) {
            setError(
                err.response?.data?.message ||
                    "Lỗi khi tải danh sách thuộc tính",
            );
        } finally {
            setLoading(false);
        }
    }, []);

    // Lấy chi tiết
    const fetchAttributeById = useCallback(async (id) => {
        setLoading(true);
        try {
            const data = await attributeService.getById(id);
            const mapped = mapToFrontend(data);
            setAttribute(mapped);
            return mapped;
        } catch (err) {
            setError(
                err.response?.data?.message ||
                    "Lỗi khi tải chi tiết thuộc tính",
            );
            return null;
        } finally {
            setLoading(false);
        }
    }, []);

    // Tạo mới
    const createAttribute = async (formData) => {
        setLoading(true);
        try {
            const payload = mapToBackend(formData);
            await attributeService.create(payload);
            return { success: true };
        } catch (err) {
            return {
                success: false,
                message: err.response?.data?.message || "Lỗi khi tạo mới",
            };
        } finally {
            setLoading(false);
        }
    };

    // Cập nhật
    const updateAttribute = async (id, formData) => {
        setLoading(true);
        try {
            const payload = mapToBackend(formData);
            await attributeService.update(id, payload);
            return { success: true };
        } catch (err) {
            return {
                success: false,
                message: err.response?.data?.message || "Lỗi khi cập nhật",
            };
        } finally {
            setLoading(false);
        }
    };

    // Xóa
    const deleteAttribute = async (id) => {
        setLoading(true);
        try {
            await attributeService.delete(id);
            setAttributes((prev) => prev.filter((item) => item.id !== id));
            return { success: true };
        } catch (err) {
            return {
                success: false,
                message: err.response?.data?.message || "Lỗi khi xóa",
            };
        } finally {
            setLoading(false);
        }
    };

    return {
        attributes,
        attribute,
        loading,
        error,
        fetchAttributes,
        fetchAttributeById,
        createAttribute,
        updateAttribute,
        deleteAttribute,
    };
};
