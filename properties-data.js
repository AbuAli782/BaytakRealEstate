// ========================================
// 🏠 بيانات العقارات - بيتك العقارية
// ========================================
// لتعديل العقارات، قم بتحرير البيانات أدناه فقط

const propertiesData = [
    {
        id: 1,
        name: { ar: "فيلا فاخرة في صنعاء", en: "Luxury Villa in Sanaa" },
        location: { ar: "📍 صنعاء - حدة", en: "📍 Sanaa - Hadda" },
        price: "$350,000",
        mainImage: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=500",
        images: [
            "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800",
            "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800",
            "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800"
        ],
        description: {
            ar: "فيلا فاخرة حديثة البناء في أرقى أحياء صنعاء، تصميم معماري عصري مع حديقة واسعة ومسبح خاص. تحتوي على 5 غرف نوم رئيسية، 4 حمامات فاخرة، مجلس كبير، صالة استقبال، مطبخ أمريكي مجهز بالكامل.",
            en: "Modern luxury villa in finest Sanaa neighborhoods, contemporary design with spacious garden and private pool."
        },
        area: "450 م²",
        bedrooms: "5",
        bathrooms: "4",
        type: { ar: "فيلا", en: "Villa" },
        status: { ar: "للبيع", en: "For Sale" }
    }
];

// ========================================
// 🔄 دمج البيانات من لوحة التحكم
// ========================================
function getAllProperties() {
    // الحصول على العقارات المضافة من لوحة التحكم
    const adminProperties = JSON.parse(localStorage.getItem('properties') || '[]');
    
    // تحويل العقارات المضافة من لوحة التحكم للصيغة المطلوبة
    const formattedAdminProperties = adminProperties.map(prop => ({
        id: prop.id,
        name: { ar: prop.name, en: prop.name },
        location: { ar: prop.location, en: prop.location },
        price: formatAdminPrice(prop.price, prop.type),
        mainImage: prop.images && prop.images.length > 0 ? prop.images[0] : 'property1.jpg',
        images: prop.images || [],
        description: {
            ar: prop.description || 'عقار مميز',
            en: prop.description || 'Premium Property'
        },
        area: prop.area + ' م²',
        bedrooms: prop.rooms.toString(),
        bathrooms: prop.bathrooms.toString(),
        type: { ar: prop.category, en: prop.category },
        status: { 
            ar: prop.type === 'sale' ? 'للبيع' : 'للإيجار', 
            en: prop.type === 'sale' ? 'For Sale' : 'For Rent' 
        }
    }));
    
    // دمج العقارات (العقارات المضافة من لوحة التحكم أولاً)
    return [...formattedAdminProperties, ...propertiesData];
}

function formatAdminPrice(price, type) {
    const numPrice = parseInt(price);
    if (type === 'rent') {
        return numPrice.toLocaleString('ar-YE') + ' ريال/شهر';
    }
    return numPrice.toLocaleString('ar-YE') + ' ريال';
}
