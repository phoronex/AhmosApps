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
                "title": "🔂 Html Text Replacer",
                "description": "This bookmarklet allows you to search and replace text on an html web page.",
                "code": "javascript:(function(){var existing=document.getElementById(\"rich-replacer-panel\");if(existing){existing.remove();}var target=prompt(\"Enter the exact text you want to replace:\");if(!target){return;}var savedSnapshot=null;var lastTarget=null;var activeFormat=null;var panel=document.createElement(\"div\");panel.id=\"rich-replacer-panel\";panel.style.cssText=\"position:fixed;top:20px;right:20px;width:420px;background:#ffffff;border:1px solid #dadce0;box-shadow:0 4px 24px rgba(0,0,0,0.2);z-index:9999999;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;padding:16px;border-radius:12px;color:#202124;user-select:none;cursor:grab;\";var header=document.createElement(\"div\");header.style.cssText=\"display:flex;justify-content:space-between;align-items:center;margin-bottom:12px;border-bottom:1px solid #f1f3f4;padding-bottom:8px;\";var title=document.createElement(\"div\");title.innerHTML='Target: <b style=\"color:#1a73e8;\">'+target+'</b>';title.style.cssText=\"font-size:13px;font-weight:600;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;max-width:320px;\";header.appendChild(title);var closeBtn=document.createElement(\"button\");closeBtn.innerHTML=\"&#x2715;\";closeBtn.style.cssText=\"border:none;background:none;font-size:16px;cursor:pointer;color:#5f6368;padding:0 4px;\";closeBtn.onclick=function(){panel.remove();};header.appendChild(closeBtn);panel.appendChild(header);var optRow=document.createElement(\"div\");optRow.style.cssText=\"margin-bottom:10px;display:flex;justify-content:space-between;align-items:center;font-size:12px;color:#5f6368;\";var caseLabel=document.createElement(\"label\");caseLabel.style.cssText=\"display:flex;align-items:center;gap:6px;cursor:pointer;\";var caseCheck=document.createElement(\"input\");caseCheck.type=\"checkbox\";caseCheck.checked=true;caseCheck.style.cssText=\"margin:0;cursor:pointer;\";caseLabel.appendChild(caseCheck);caseLabel.appendChild(document.createTextNode(\"Match Case\"));optRow.appendChild(caseLabel);var counterSpan=document.createElement(\"span\");counterSpan.style.cssText=\"background:#e8f0fe;color:#1a73e8;padding:2px 8px;border-radius:10px;font-weight:bold;\";optRow.appendChild(counterSpan);panel.appendChild(optRow);function updateCount(){var exactCase=caseCheck.checked;function escapeRegExp(s){return s.replace(/[.*+?^${}()|[\\]\\\\]/g,'\\\\$&');}var regex=new RegExp(escapeRegExp(target),exactCase?\"g\":\"gi\");var count=0;function countWalk(node){if(node.nodeType===3){var matches=node.nodeValue.match(regex);if(matches){count+=matches.length;}}else if(node.nodeType===1&&!/^(script|style|textarea|input)$/i.test(node.tagName)&&node.id!==\"rich-replacer-panel\"){for(var i=0;i<node.childNodes.length;i++){countWalk(node.childNodes[i]);}}}countWalk(document.body);counterSpan.innerText=count+\" matches found\";}caseCheck.onchange=updateCount;setTimeout(updateCount,100);var toolbar=document.createElement(\"div\");toolbar.style.cssText=\"margin-bottom:8px;display:flex;gap:4px;align-items:center;background:#f8f9fa;padding:6px;border-radius:6px;border:1px solid #dadce0;flex-wrap:wrap;user-select:none;\";function createBtn(html,title,cmd,val=null){var b=document.createElement(\"button\");b.innerHTML=html;b.title=title;b.style.cssText=\"padding:4px 6px;border:1px solid #dadce0;background:#fff;cursor:pointer;border-radius:4px;font-size:12px;color:#3c4043;font-weight:500;display:inline-flex;align-items:center;justify-content:center;height:26px;min-width:26px;\";b.type=\"button\";b.onmousedown=function(e){e.preventDefault();if(cmd){document.execCommand(cmd,false,val);editor.focus();}};toolbar.appendChild(b);return b;}createBtn(\"<b>B</b>\",\"Bold\",\"bold\");createBtn(\"<i>I</i>\",\"Italic\",\"italic\");createBtn(\"<u>U</u>\",\"Underline\",\"underline\");createBtn(\"<strike>S</strike>\",\"Strikethrough\",\"strikeThrough\");var brushBtn=createBtn(\"&#x1F58C;\",\"Format Brush\",null);brushBtn.onmousedown=function(e){e.preventDefault();var sel=window.getSelection();if(sel.rangeCount>0){var containerNode=sel.getRangeAt(0).commonAncestorContainer;if(containerNode.nodeType===3){containerNode=containerNode.parentNode;}if(editor.contains(containerNode)){activeFormat={color:containerNode.style.color||getComputedStyle(containerNode).color,backgroundColor:containerNode.style.backgroundColor||getComputedStyle(containerNode).backgroundColor,fontSize:containerNode.style.fontSize||getComputedStyle(containerNode).fontSize,fontFamily:containerNode.style.fontFamily||getComputedStyle(containerNode).fontFamily,fontWeight:getComputedStyle(containerNode).fontWeight,fontStyle:getComputedStyle(containerNode).fontStyle,textDecoration:getComputedStyle(containerNode).textDecoration};brushBtn.style.background=\"#e8f0fe\";brushBtn.style.borderColor=\"#1a73e8\";return;}}alert(\"Highlight text inside the replacement editor first to copy its style!\");};var fontSel=document.createElement(\"select\");fontSel.title=\"Font Family\";fontSel.style.cssText=\"height:26px;font-size:11px;border:1px solid #dadce0;border-radius:4px;background:#fff;color:#3c4043;cursor:pointer;max-width:90px;\";var fonts=[\"Arial\",\"Times New Roman\",\"Courier New\",\"Georgia\",\"Verdana\",\"Comic Sans MS\"];fonts.forEach(function(f){var o=document.createElement(\"option\");o.value=o.text=f;fontSel.appendChild(o);});fontSel.onchange=function(){document.execCommand(\"fontName\",false,fontSel.value);editor.focus();};toolbar.appendChild(fontSel);var sizeInput=document.createElement(\"input\");sizeInput.type=\"number\";sizeInput.value=\"14\";sizeInput.title=\"Font Size (px)\";sizeInput.style.cssText=\"width:42px;height:24px;font-size:11px;border:1px solid #dadce0;border-radius:4px;padding:0 2px;text-align:center;\";sizeInput.onchange=function(){var sel=window.getSelection();if(sel.rangeCount>0){var span=document.createElement(\"span\");span.style.fontSize=sizeInput.value+\"px\";var range=sel.getRangeAt(0);span.appendChild(range.extractContents());range.insertNode(span);editor.focus();}};toolbar.appendChild(sizeInput);var cp=document.createElement(\"input\");cp.type=\"color\";cp.title=\"Text Color\";cp.style.cssText=\"width:24px;height:24px;padding:0;border:1px solid #dadce0;border-radius:4px;cursor:pointer;background:none;\";cp.oninput=function(){document.execCommand(\"foreColor\",false,cp.value);};toolbar.appendChild(cp);var hp=document.createElement(\"input\");hp.type=\"color\";hp.value=\"#ffff00\";hp.title=\"Highlight Color\";hp.style.cssText=\"width:24px;height:24px;padding:0;border:1px solid #dadce0;border-radius:4px;cursor:pointer;background:none;\";hp.oninput=function(){document.execCommand(\"hiliteColor\",false,hp.value);};toolbar.appendChild(hp);var txBtn=createBtn(\"&#x25A2;\",\"Clear Formatting\",\"removeFormat\");panel.appendChild(toolbar);var editorWrapper=document.createElement(\"div\");editorWrapper.style.cssText=\"user-select:text;cursor:text;\";var editor=document.createElement(\"div\");editor.contentEditable=true;editor.style.cssText=\"height:90px;border:1px solid #dadce0;padding:8px;overflow-y:auto;background:#fff;border-radius:6px;outline:none;font-size:14px;line-height:1.5;color:#202124;\";editorWrapper.appendChild(editor);panel.appendChild(editorWrapper);editor.addEventListener(\"mouseup\",function(){if(activeFormat){var sel=window.getSelection();if(sel.rangeCount>0&&!sel.isCollapsed){var span=document.createElement(\"span\");span.style.color=activeFormat.color;span.style.backgroundColor=activeFormat.backgroundColor;span.style.fontSize=activeFormat.fontSize;span.style.fontFamily=activeFormat.fontFamily;span.style.fontWeight=activeFormat.fontWeight;span.style.fontStyle=activeFormat.fontStyle;span.style.textDecoration=activeFormat.textDecoration;var range=sel.getRangeAt(0);span.appendChild(range.extractContents());range.insertNode(span);activeFormat=null;brushBtn.style.background=\"#fff\";brushBtn.style.borderColor=\"#dadce0\";}}});var footer=document.createElement(\"div\");footer.style.cssText=\"margin-top:12px;display:flex;justify-content:between;align-items:center;width:100%;\";var undoBtn=document.createElement(\"button\");undoBtn.innerText=\"Undo Last\";undoBtn.disabled=true;undoBtn.style.cssText=\"padding:6px 12px;border:1px solid #dadce0;background:#fff;color:#5f6368;cursor:not-allowed;border-radius:6px;font-size:12px;opacity:0.5;\";undoBtn.onclick=function(){if(savedSnapshot){document.body.innerHTML=savedSnapshot;panel.remove();alert(\"Last replace operation reverted successfully!\");}};var rightFooter=document.createElement(\"div\");rightFooter.style.cssText=\"display:flex;gap:8px;margin-left:auto;\";var replaceBtn=document.createElement(\"button\");replaceBtn.innerText=\"Replace All\";replaceBtn.style.cssText=\"padding:8px 16px;border:none;background:#1a73e8;color:#fff;cursor:pointer;border-radius:6px;font-size:13px;font-weight:500;box-shadow:0 1px 2px rgba(0,0,0,0.05);\";replaceBtn.onclick=function(){var replacement=editor.innerHTML;var exactCase=caseCheck.checked;panel.style.display=\"none\";savedSnapshot=document.body.innerHTML;panel.style.display=\"block\";function escapeRegExp(string){return string.replace(/[.*+?^${}()|[\\]\\\\]/g,'\\\\$&');}var regex=new RegExp(escapeRegExp(target),exactCase?\"g\":\"gi\");function walk(node){if(node.nodeType===3){if(regex.test(node.nodeValue)){var temp=document.createElement(\"div\");temp.innerHTML=node.nodeValue.replace(regex,replacement);while(temp.firstChild){node.parentNode.insertBefore(temp.firstChild,node);}node.parentNode.removeChild(node);}}else if(node.nodeType===1&&node.childNodes&&!/^(script|style|textarea|input)$/i.test(node.tagName)&&node.id!==\"rich-replacer-panel\"){for(var i=node.childNodes.length-1;i>=0;i--){walk(node.childNodes[i]);}}}walk(document.body);document.body.appendChild(panel);undoBtn.disabled=false;undoBtn.style.cursor=\"pointer\";undoBtn.style.opacity=\"1\";undoBtn.style.color=\"#3c4043\";updateCount();};rightFooter.appendChild(replaceBtn);footer.appendChild(undoBtn);footer.appendChild(rightFooter);panel.appendChild(footer);document.body.appendChild(panel);var isDragging=false,startX,startY,startLeft,startTop;panel.onmousedown=function(e){if(e.target.closest(\"input, select, button, [contenteditable=true]\"))return;isDragging=true;panel.style.cursor=\"grabbing\";startX=e.clientX;startY=e.clientY;var rect=panel.getBoundingClientRect();startLeft=rect.left;startTop=rect.top;e.preventDefault();};document.addEventListener(\"mousemove\",function(e){if(!isDragging)return;var dx=e.clientX-startX;var dy=e.clientY-startY;panel.style.left=(startLeft+dx)+\"px\";panel.style.top=(startTop+dy)+\"px\";panel.style.right=\"auto\";});document.addEventListener(\"mouseup\",function(){if(isDragging){isDragging=false;panel.style.cursor=\"grab\";}});})();"
              },
              {
                "title": "Toggle Flowise Chatbot Visibility",
                "description": "This bookmarklet allows you to hide or show the Flowise chatbot widget on any webpage. Simply click the bookmark to toggle the visibility. Perfect for taking screenshots or presenting without distractions.",
                "code": "javascript:(function(){const e=document.querySelector('flowise-chatbot');if(!e)return alert('Flowise not found');const s=e.style.display==='none';e.style.display=s?'':'none';if(e.shadowRoot){const r=e.shadowRoot;r.host.style.display=s?'':'none';const t=r.querySelectorAll('*');t.forEach(x=>x.style.display=s?'':'none');}console.log('Flowise '+ (s?'shown':'hidden'));})();"
              },
              {
                "title": "Example JSON Viewer",
                "description": "This bookmarklet formats and displays JSON data in a readable format on the current page. Useful for developers working with APIs.",
                "code": "javascript:(function(){try{const data=prompt('Paste your JSON:');if(data){const formatted=JSON.stringify(JSON.parse(data),null,2);const w=window.open('');w.document.write('<pre>'+formatted+'</pre>');}}catch(e){alert('Invalid JSON: '+e.message);}})();"
              }
        /*
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
        
        */
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
