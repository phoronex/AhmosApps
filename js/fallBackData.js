// ============================================
// DATA SECTION - EDIT THIS WITH YOUR DATA
// ============================================
// Initialize empty DATA object
let DATA = {
    downloads: [],
    shortcuts: [],
    bookmarklets: [],
    links: [],
    codes: [],
    aboutImages: []
};

// ============================================
// EMBEDDED DATA FUNCTION (for offline use)
// ============================================
// ============================================
// UTILITY: Export Embedded Data to JSON Files
// ============================================
function exportEmbeddedDataToJSON() {
    if (typeof getEmbeddedData !== 'function') {
        alert('getEmbeddedData function not found!');
        return;
    }

    const data = getEmbeddedData();

    // Helper function to download JSON
    function downloadJSON(filename, content) {
        const blob = new Blob([JSON.stringify(content, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = filename;
        a.click();
        URL.revokeObjectURL(url);
    }

    // Download each file
    downloadJSON('downloads.json', data.downloads);
    downloadJSON('shortcuts.json', data.shortcuts);
    downloadJSON('bookmarklets.json', data.bookmarklets);
    downloadJSON('links.json', data.links);
    downloadJSON('codes.json', data.codes);
    downloadJSON('aboutImages.json', data.aboutImages);

    alert('✓ All JSON files downloaded! Check your Downloads folder.');
    console.log('✓ Exported 6 JSON files successfully');
}

function getEmbeddedData() {
    return {
        aboutImages: [
            "appImages/about01.jpg",
            "appImages/about02.jpg"
        ],
        downloads: [
            {
                name: "Ahmos Key",
                version: "2.1",
                released: "18-12-2025",
                description: "To open The AhmosApp Data File",
                link32: "",
                link64: ""
            },
            {
                name: "Ahmos App",
                version: "7.3",
                released: "05-01-2026",
                description: "Automate many Wasl operations",
                link32: "",
                link64: ""
            },
            {
                name: "Ahmos DataBase",
                version: "7.3",
                released: "05-01-2026",
                description: "Automate many System operations",
                link32: "",
                link64: ""
            },
            {
                name: "Ahmos Codes",
                version: "4.6",
                released: "14-01-2026",
                description: "🔥 Excel Macros Just try it",
                link32: "https://www.mediafire.com/file/vtcc9pyubuj94vs/AhmosCodes_V4.6.rar/file",
                link64: "https://www.mediafire.com/file/vtcc9pyubuj94vs/AhmosCodes_V4.6.rar/file"
            }
        ],

        shortcuts: [
            {
                index: 1,
                groupBy: "General",
                key: "CTRL + SHIFT + V",
                descriptionAr: "لسرعة إدخال البيانات داخل النماذج",
                descriptionEn: "General Paste inside any form",
                details: "يستخدم هذا الأختصار للإدخال السريع عل كل النماذج ويتم تفعيل الأمر المناسب" + "\n This shortcut is used on all over the app forms for easy data entry.",
                images: ["appImages/gPasteEx.gif"]
            },
            {
                index: 2,
                groupBy: "General",
                key: "CTRL + SHIFT + C",
                descriptionAr: "مسح سجلات النماذج",
                descriptionEn: "Clear Form Records"
            },
            {
                index: 3,
                groupBy: "Wasl_Team_Only",
                key: "CTRL + SHIFT + D",
                descriptionAr: "للصق بيانات المركبات مع أسم السائق داخل النموذج الرئيسي",
                descriptionEn: "To paste the vehicle data with driver name to the main form",
                images: []
            },
            {
                index: 4,
                groupBy: "Wasl_Team_Only",
                key: "CTRL + SHIFT + E",
                descriptionAr: "تصدير ملفات ربط وصل",
                descriptionEn: "Export Wasl Link Sheets"
            },
            {
                index: 5,
                groupBy: "PRO",
                key: "CTRL + G",
                descriptionAr: "مراجعة بيانات الجهاز والحساسات",
                descriptionEn: "Device sensors revision",
                details: "قم بنسخ رقم جهاز واحد او أكثر ثم أضغط علي الاختصار لإنتاج التقرير\nCopy one or more device, then press the shortcut to generate the report"
            },
            {
                index: 6,
                groupBy: "PRO",
                key: "CTRL + SHIFT + G",
                descriptionAr: "مراجعة بيانات الجهاز والحساسات - النموذج القديم",
                descriptionEn: "Device sensors revision - old template",
                details: "قم بنسخ رقم جهاز واحد او أكثر ثم أضغط علي الاختصار لإنتاج التقرير\nCopy one or more device, then press the shortcut to generate the report"
            },
            {
                index: 7,
                groupBy: "Wasl_Team_Only",
                key: "CTRL + SHIFT + H",
                descriptionAr: "لتصدير تقرير الرد الخاص بالمركبات المربوطة",
                descriptionEn: "To Export the linked vehicles HTML Report"
            },
            {
                index: 8,
                groupBy: "General",
                key: "CTRL + H",
                descriptionAr: "استدعاء قائمة بسجل العمليات الأخيرة",
                descriptionEn: "Retrieve a list of recent transactions."
            },
            {
                index: 9,
                groupBy: "General",
                key: "CTRL + L",
                descriptionAr: "إستدعاء نتيجة أخر عملية",
                descriptionEn: "Retrieve the last operation result"
            },
            {
                index: 10,
                groupBy: "General",
                key: "CTRL + SHIFT + N",
                descriptionAr: "لإضافة فاصلة بعد أرقام الأجهزة",
                descriptionEn: "Add Comma after Device IMEI"
            },
            {
                index: 11,
                groupBy: "App_Size_Position",
                key: "CTRL + SHIFT + o",
                descriptionAr: "أبقِ التطبيق دائمًا في مقدمة التطبيقات الأخرى",
                descriptionEn: "Keep the app always on top of other applications"
            },
            {
                index: 12,
                groupBy: "CRM",
                key: "CTRL + SHIFT + P",
                descriptionAr: "للبحث بلوحات المركبات علي الـ CRM",
                descriptionEn: "Search with plates on CRM"
            },
            {
                index: 13,
                groupBy: "PRO",
                key: "CTRL + P",
                descriptionAr: "للبحث بلوحات المركبات علي حساب عميل علي الـ PRO",
                descriptionEn: "Search with plates on PRO"
            },
            {
                index: 14,
                groupBy: "CRM",
                key: "CTRL + SHIFT + S",
                descriptionAr: "لحفظ ثم عرض بيانات طلب إيقاف الخدمة ولصق الأجهزة بالمحفظة",
                descriptionEn: "To save and preview a stop service details and paste All IMEI to the clipboard"
            },
            {
                index: 15,
                groupBy: "CRM",
                key: "CTRL + SHIFT + T",
                descriptionAr: "لحفظ ثم عرض بيانات طلب نقل الأجهزة ولصق الأجهزة بالمحفظة",
                descriptionEn: "To save and preview a TSU details and paste All IMEI to the clipboard"
            },
            {
                index: 16,
                groupBy: "Wasl_Team_Only",
                key: "CTRL + SHIFT + Y",
                descriptionAr: "لمعالجة بيانات الشركة وتجهيزها لسهولة الأستخدام",
                descriptionEn: "Prepare company data to make it ready for easy use"
            },
            {
                index: 17,
                groupBy: "General",
                key: "CTRL + SHIFT + F6",
                descriptionAr: "لعرض قائمة ببعض الوظائف الهامة",
                descriptionEn: "To show a list of some important Features"
            },
            {
                index: 18,
                groupBy: "App_Size_Position",
                key: "CTRL + SHIFT + F10",
                descriptionAr: "لتصغير مقاسات البرنامج ليتناسب مع الشاشات الصغيرة",
                descriptionEn: "Make the app Smaller for small screens"
            },
            {
                index: 19,
                groupBy: "App_Size_Position",
                key: "CTRL + 0",
                descriptionAr: "لتحديث وقراءة بيانات الشاشات خاصة عند توصيل شاشة جديدة",
                descriptionEn: "Refresh And read screens setting especially when you connect a new one"
            },
            {
                index: 20,
                groupBy: "App_Size_Position",
                key: "CTRL + SHIFT + 1",
                descriptionAr: "اضبط موضع التطبيق على الشاشة رقم 1",
                descriptionEn: "Adjust the app position to screen no.1"
            },
            {
                index: 21,
                groupBy: "App_Size_Position",
                key: "CTRL + SHIFT + 2",
                descriptionAr: "اضبط موضع التطبيق على الشاشة رقم 2",
                descriptionEn: "Adjust the app position to screen no.2"
            },
            {
                index: 22,
                groupBy: "App_Size_Position",
                key: "CTRL + SHIFT + 3",
                descriptionAr: "اضبط موضع التطبيق على الشاشة رقم 3",
                descriptionEn: "Adjust the app position to screen no.3"
            },
            {
                index: 23,
                groupBy: "General",
                key: "CTRL + SHIFT + 7",
                descriptionAr: "لتحويل أي جدول لصفحة HTML",
                descriptionEn: "Convert any table to HTML"
            }

        ],

        bookmarklets: [
            {
                title: "Toggle Flowise Chatbot Visibility",
                description: "This bookmarklet allows you to hide or show the Flowise chatbot widget on any webpage. Simply click the bookmark to toggle the visibility. Perfect for taking screenshots or presenting without distractions.",
                code: "javascript:(function(){const e=document.querySelector('flowise-chatbot');if(!e)return alert('Flowise not found');const s=e.style.display==='none';e.style.display=s?'':'none';if(e.shadowRoot){const r=e.shadowRoot;r.host.style.display=s?'':'none';const t=r.querySelectorAll('*');t.forEach(x=>x.style.display=s?'':'none');}console.log('Flowise '+ (s?'shown':'hidden'));})();"
            },
            {
                title: "Example JSON Viewer",
                description: "This bookmarklet formats and displays JSON data in a readable format on the current page. Useful for developers working with APIs.",
                code: "javascript:(function(){try{const data=prompt('Paste your JSON:');if(data){const formatted=JSON.stringify(JSON.parse(data),null,2);const w=window.open('');w.document.write('<pre>'+formatted+'</pre>');}}catch(e){alert('Invalid JSON: '+e.message);}})();"
            }
        ],

        links: [
            /*
            {
                name: "🔥 Excel Automation Codes V4.6",
                url: "https://www.mediafire.com/file/vtcc9pyubuj94vs/AhmosCodes_V4.6.rar/file"
            },
            */
            {
                name: "🛠️ Json Formatter Pro",
                url: "https://phoronex.github.io/ahmosjf"
            },
            {
                name: "💀 Online QR Reader",
                url: "https://phoronex.github.io/ahmosjf/AhmosQR"
            },
            {
                name: "📊 Excel Formula Generator",
                url: "https://phoronex.github.io/ahmosjf/AhmosExcelFGen"
            }
        ],

        codes: [
            {
                title: "Calculate Days Between Two Dates (Simple)",
                template: "=IF(COUNT({{startCell}}:{{endCell}})=2,DAYS({{endCell}},{{startCell}}), IF(COUNT({{startCell}}:{{endCell}})=1,\"missingDate\",\"\"))",
                variables: [
                    {
                        name: "startCell",
                        label: "Start Cell",
                        type: "text",
                        placeholder: "e.g., A3",
                        default: "A3"
                    },
                    {
                        name: "endCell",
                        label: "End Cell",
                        type: "text",
                        placeholder: "e.g., B3",
                        default: "B3"
                    }
                ]
            },
            {
                title: "Calculate Days Between Request and Installation Dates",
                template: "=IF(AND(LEN([@[{{requestDateField}}]])>2,LEN([@[{{installDateField}}]])>2),\n    DAYS([@[{{installDateField}}]],[@[{{requestDateField}}]]),\n    IF(LEN([@[{{requestDateField}}]])>2,\n        \"missingInstallationDate\",\n        IF(LEN([@[{{installDateField}}]])>2,\n            \"missingCreationDate\",\n            \"\"\n        )\n    )\n)",
                variables: [
                    {
                        name: "requestDateField",
                        label: "Request Date Field",
                        type: "text",
                        placeholder: "e.g., Request & Creation Date",
                        default: "Request & Creation Date"
                    },
                    {
                        name: "installDateField",
                        label: "Installation Date Field",
                        type: "text",
                        placeholder: "e.g., Installation Date",
                        default: "Installation Date"
                    }
                ]
            },
            {
                title: "Round Value to Nearest Multiple",
                template: "=ROUND(({{cellRef}} + {{addValue}})/{{multiple}}, 0) * {{multiple}}",
                variables: [
                    {
                        name: "cellRef",
                        label: "Cell Reference",
                        type: "text",
                        placeholder: "e.g., L2",
                        default: "L2"
                    },
                    {
                        name: "addValue",
                        label: "Add Value",
                        type: "text",
                        placeholder: "e.g., 2500",
                        default: "2500"
                    },
                    {
                        name: "multiple",
                        label: "Round to Multiple",
                        type: "text",
                        placeholder: "e.g., 500",
                        default: "500"
                    }
                ]
            },
            {
                title: "Conditional Formula Example",
                template: "=IF({{condition}}, {{trueValue}}, {{falseValue}})",
                variables: [
                    {
                        name: "condition",
                        label: "Condition",
                        type: "text",
                        placeholder: "e.g., A1>100",
                        default: "A1>100"
                    },
                    {
                        name: "trueValue",
                        label: "True Value",
                        type: "text",
                        placeholder: "Value if true",
                        default: "\"Pass\""
                    },
                    {
                        name: "falseValue",
                        label: "False Value",
                        type: "text",
                        placeholder: "Value if false",
                        default: "\"Fail\""
                    }
                ]
            },
            {
                title: "Custom Formula with Checkbox",
                template: "=IF({{useAdvanced}}, {{advancedFormula}}, {{simpleFormula}})",
                variables: [
                    {
                        name: "useAdvanced",
                        label: "Use Advanced Formula",
                        type: "checkbox",
                        default: false,
                        trueValue: "TRUE",
                        falseValue: "FALSE"
                    },
                    {
                        name: "advancedFormula",
                        label: "Advanced Formula",
                        type: "text",
                        placeholder: "Complex calculation",
                        default: "SUM(A1:A10)*1.2"
                    },
                    {
                        name: "simpleFormula",
                        label: "Simple Formula",
                        type: "text",
                        placeholder: "Basic calculation",
                        default: "SUM(A1:A10)"
                    }
                ]
            },
            {
                title: "VLOOKUP with Options",
                template: "=VLOOKUP({{searchValue}}, {{tableRange}}, {{columnIndex}}, {{matchType}})",
                variables: [
                    {
                        name: "searchValue",
                        label: "Search Value",
                        type: "text",
                        placeholder: "e.g., A2",
                        default: "A2"
                    },
                    {
                        name: "tableRange",
                        label: "Table Range",
                        type: "text",
                        placeholder: "e.g., Sheet2!A:B",
                        default: "Sheet2!A:B"
                    },
                    {
                        name: "columnIndex",
                        label: "Column Index",
                        type: "text",
                        placeholder: "e.g., 2",
                        default: "2"
                    },
                    {
                        name: "matchType",
                        label: "Match Type",
                        type: "select",
                        options: ["FALSE", "TRUE"],
                        default: "FALSE"
                    }
                ]
            }
        ]
    };

}
