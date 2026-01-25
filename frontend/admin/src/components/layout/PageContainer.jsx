// components/layout/PageContainer.jsx
const PageContainer = ({
    title,
    breadcrumb,
    children,
    actions,
    className = "",
}) => {
    return (
        <div className={`p-6 ${className}`}>
            {/* Header với breadcrumb và actions */}
            <div className="mb-6">
                {breadcrumb && (
                    <div className="text-sm text-gray-500 mb-2">
                        {breadcrumb}
                    </div>
                )}

                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <h1 className="text-2xl font-bold text-gray-800">
                        {title}
                    </h1>

                    {actions && (
                        <div className="flex items-center space-x-3">
                            {actions}
                        </div>
                    )}
                </div>
            </div>

            {/* Page content - tự động scroll nếu nội dung dài */}
            <div className="overflow-y-auto max-h-[calc(100vh-12rem)]">
                {children}
            </div>
        </div>
    );
};

export default PageContainer;
