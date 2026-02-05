// ============================================
// DYNAMIC DATA LOADING (Online/Offline)
// ============================================

const USE_JSON_FILES = true; // Set to false for offline/embedded mode

async function loadAllData() {
    // Check if using embedded data (offline mode)
    if (!USE_JSON_FILES) {
        console.log('Using embedded data (offline mode)');

        // Check if getEmbeddedData function exists
        if (typeof getEmbeddedData === 'function') {
            const embeddedData = getEmbeddedData();
            DATA.downloads = embeddedData.downloads || [];
            DATA.shortcuts = embeddedData.shortcuts || [];
            DATA.bookmarklets = embeddedData.bookmarklets || [];
            DATA.links = embeddedData.links || [];
            DATA.codes = embeddedData.codes || [];
            DATA.aboutImages = embeddedData.aboutImages || [];
            console.log('✓ Embedded data loaded successfully');
        } else {
            console.error('❌ getEmbeddedData function not found!');
            alert('Error: Embedded data function not found. Please check your code.');
        }

        initializeApp();
        return;
    }

    // Try to load from JSON files (online mode)
    console.log('Attempting to load from JSON files (online mode)...');

    try {
        const results = await Promise.allSettled([
            fetch('jsonSource/downloads.json').then(r => r.json()),
            fetch('jsonSource/shortcuts.json').then(r => r.json()),
            fetch('jsonSource/bookmarklets.json').then(r => r.json()),
            fetch('jsonSource/links.json').then(r => r.json()),
            fetch('jsonSource/codes.json').then(r => r.json()),
            fetch('jsonSource/aboutImages.json').then(r => r.json())
        ]);

        // Process results and check for errors
        const [downloads, shortcuts, bookmarklets, links, codes, aboutImages] = results;

        let hasErrors = false;
        let errorMessages = [];

        if (downloads.status === 'fulfilled') {
            DATA.downloads = downloads.value;
            console.log('✓ downloads.json loaded');
        } else {
            hasErrors = true;
            errorMessages.push('downloads.json');
            console.warn('✗ downloads.json failed to load');
        }

        if (shortcuts.status === 'fulfilled') {
            DATA.shortcuts = shortcuts.value;
            console.log('✓ shortcuts.json loaded');
        } else {
            hasErrors = true;
            errorMessages.push('shortcuts.json');
            console.warn('✗ shortcuts.json failed to load');
        }

        if (bookmarklets.status === 'fulfilled') {
            DATA.bookmarklets = bookmarklets.value;
            console.log('✓ bookmarklets.json loaded');
        } else {
            hasErrors = true;
            errorMessages.push('bookmarklets.json');
            console.warn('✗ bookmarklets.json failed to load');
        }

        if (links.status === 'fulfilled') {
            DATA.links = links.value;
            console.log('✓ links.json loaded');
        } else {
            hasErrors = true;
            errorMessages.push('links.json');
            console.warn('✗ links.json failed to load');
        }

        if (codes.status === 'fulfilled') {
            DATA.codes = codes.value;
            console.log('✓ codes.json loaded');
        } else {
            hasErrors = true;
            errorMessages.push('codes.json');
            console.warn('✗ codes.json failed to load');
        }

        if (aboutImages.status === 'fulfilled') {
            DATA.aboutImages = aboutImages.value;
            console.log('✓ aboutImages.json loaded');
        } else {
            hasErrors = true;
            errorMessages.push('aboutImages.json');
            console.warn('✗ aboutImages.json failed to load');
        }

        if (hasErrors) {
            console.warn(`⚠️ Some JSON files failed to load: ${errorMessages.join(', ')}`);
            console.log('Falling back to embedded data for missing files...');

            // Check if embedded data exists and fill missing data
            if (typeof getEmbeddedData === 'function') {
                const embeddedData = getEmbeddedData();

                if (DATA.downloads.length === 0) DATA.downloads = embeddedData.downloads || [];
                if (DATA.shortcuts.length === 0) DATA.shortcuts = embeddedData.shortcuts || [];
                if (DATA.bookmarklets.length === 0) DATA.bookmarklets = embeddedData.bookmarklets || [];
                if (DATA.links.length === 0) DATA.links = embeddedData.links || [];
                if (DATA.codes.length === 0) DATA.codes = embeddedData.codes || [];
                if (DATA.aboutImages.length === 0) DATA.aboutImages = embeddedData.aboutImages || [];

                console.log('✓ Fallback to embedded data completed');
            }
        } else {
            console.log('✓ All JSON files loaded successfully from online sources');
        }

    } catch (error) {
        console.error('❌ Critical error loading JSON files:', error);
        console.log('Attempting to use embedded data...');

        // Fallback to embedded data
        if (typeof getEmbeddedData === 'function') {
            const embeddedData = getEmbeddedData();
            DATA.downloads = embeddedData.downloads || [];
            DATA.shortcuts = embeddedData.shortcuts || [];
            DATA.bookmarklets = embeddedData.bookmarklets || [];
            DATA.links = embeddedData.links || [];
            DATA.codes = embeddedData.codes || [];
            DATA.aboutImages = embeddedData.aboutImages || [];
            console.log('✓ Loaded embedded data as fallback');
        } else {
            console.error('❌ No embedded data available. Application may not function correctly.');
            alert('Error: Unable to load data. Please check your internet connection or contact support.');
        }
    }

    initializeApp();
}

// New initialization function
function initializeApp() {
    loadDownloads();
    loadShortcuts();
    loadBookmarklets();
    loadLinks();
    loadCodes();
    loadAboutImages();
}



// ============================================
// APPLICATION CODE - NO NEED TO EDIT BELOW
// ============================================

// Date and Time Functions

// Convert Hijri to Julian Day
function toJulianFromHijri(hYear, hMonth, hDay) {
    // Hijri Epoch in Julian Day: July 16, 622 CE = 1948439.5
    const epoch = 1948439.5;
    // Length of a lunar year is approx 354.366 days
    const yearInDays = (hYear - 1) * 354.366;

    // Days in preceding months (approximate standard Hijri month lengths)
    const monthLengths = [30, 29, 30, 29, 30, 29, 30, 29, 30, 29, 30, 29];
    let daysInMonths = 0;
    for (let i = 0; i < hMonth - 1; i++) {
        daysInMonths += monthLengths[i];
    }

    return epoch + yearInDays + daysInMonths + hDay;
}

// Convert Julian Day to Gregorian
function fromJulian(jd) {
    let a = jd + 0.5;
    let z = Math.floor(a);
    let f = a - z;

    let alpha = Math.floor((z - 1867216.25) / 36524.25);
    let b = z + 1 + alpha - Math.floor(alpha / 4);

    let c = b + 1524;
    let d = Math.floor((c - 122.1) / 365.25);
    let e = Math.floor(365.25 * d);
    let g = Math.floor((c - e) / 30.6001);

    let day = c - e - Math.floor(30.6001 * g);
    let month = g - 1 - Math.floor(g / 14);
    let year = d - 4716 - Math.floor((14 - month) / 12);

    return { year, month, day };
}

// Main function: Hijri to Gregorian
function toGregorian(hYear, hMonth, hDay) {
    const jd = toJulianFromHijri(hYear, hMonth, hDay);
    return fromJulian(jd);
}

let convertedData = [];

// Month Names for Output
const hijriMonthsAr = ['محرم', 'صفر', 'ربيع الأول', 'ربيع الثاني', 'جمادى الأولى', 'جمادى الآخرة', 'رجب', 'شعبان', 'رمضان', 'شوال', 'ذو القعدة', 'ذو الحجة'];
const hijriMonthsEn = ['Muharram', 'Safar', 'Rabi I', 'Rabi II', 'Jumada I', 'Jumada II', 'Rajab', 'Shaban', 'Ramadan', 'Shawwal', 'Dhu al-Qidah', 'Dhu al-Hijjah'];

const gregorianMonthsAr = ['يناير', 'فبراير', 'مارس', 'أبريل', 'مايو', 'يونيو', 'يوليو', 'أغسطس', 'سبتمبر', 'أكتوبر', 'نوفمبر', 'ديسمبر'];
const gregorianMonthsEn = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

function convertDates() {
    const input = document.getElementById('converterInput').value;
    const offset = parseInt(document.getElementById('offsetDays').value) || 0;
    const table = document.getElementById('resultsTable');
    const tbody = document.getElementById('tableBody');
    const status = document.getElementById('tableStatus');

    tbody.innerHTML = '';
    convertedData = [];

    if (!input.trim()) {
        status.style.display = 'block';
        table.style.display = 'none';
        status.textContent = 'Please enter at least one date.';
        return;
    }

    const lines = input.split('\n');
    let successCount = 0;

    lines.forEach(line => {
        const trimmed = line.trim();
        if (!trimmed) return;

        const result = parseAndConvert(trimmed, offset);

        const tr = document.createElement('tr');

        if (result) {
            const entryFormatted = formatEntryFormatted(result.parsedDay, result.parsedMonth, result.parsedYear);

            let f1, f2, f3, f4; // ISO, Numeric, AR, EN

            if (result.isHijri) {
                // Input Hijri -> Output Gregorian
                const date = result.convertedDate;

                f1 = `${date.year}-${String(date.month).padStart(2, '0')}-${String(date.day).padStart(2, '0')}`;
                f2 = `${String(date.day).padStart(2, '0')}-${String(date.month).padStart(2, '0')}-${date.year}`;
                f3 = `${String(date.day).padStart(2, '0')} ${gregorianMonthsAr[date.month - 1]} ${date.year}`;
                f4 = `${String(date.day).padStart(2, '0')} ${gregorianMonthsEn[date.month - 1]} ${date.year}`;

                tr.innerHTML = `
                    <td dir="auto">${trimmed}</td>
                    <td>${entryFormatted}</td>
                    <td><span style="color:#ff7700; font-weight:bold;">Hijri</span></td>
                    <td>${f1}</td>
                    <td>${f2}</td>
                    <td dir="rtl">${f3}</td>
                    <td>${f4}</td>
                `;
                successCount++;
            } else {
                // Input Gregorian -> Output Hijri
                const date = result.convertedDate;

                f1 = `${date.year}-${String(date.month).padStart(2, '0')}-${String(date.day).padStart(2, '0')}`;
                f2 = `${String(date.day).padStart(2, '0')}-${String(date.month).padStart(2, '0')}-${date.year}`;
                f3 = `${String(date.day).padStart(2, '0')} ${hijriMonthsAr[date.month - 1]} ${date.year}`;
                f4 = `${String(date.day).padStart(2, '0')} ${hijriMonthsEn[date.month - 1]} ${date.year}`;

                tr.innerHTML = `
                    <td dir="auto">${trimmed}</td>
                    <td>${entryFormatted}</td>
                    <td><span style="color:#0066cc; font-weight:bold;">Gregorian</span></td>
                    <td>${f1}</td>
                    <td>${f2}</td>
                    <td dir="rtl">${f3}</td>
                    <td>${f4}</td>
                `;
                successCount++;
            }
        } else {
            tr.innerHTML = `
                <td dir="auto">${trimmed}</td>
                <td>-</td>
                <td>-</td>
                <td colspan="4" style="color:red; text-align:center;">Invalid Format</td>
            `;
        }
        tbody.appendChild(tr);
    });

    if (successCount > 0) {
        status.style.display = 'none';
        table.style.display = 'table';
    } else {
        status.style.display = 'block';
        table.style.display = 'none';
        status.textContent = 'No valid dates found. Try formats like: YYYY-MM-DD, DD/MM/YYYY, or "09 شعبان 1447"';
    }
}

function formatEntryFormatted(day, month, year) {
    return `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
}

function parseAndConvert(dateString, offset) {
    let day, month, year, isHijri;

    // 1. Numeric Regex
    const regexNumeric = /(\d{1,4})[\/\-\.](\d{1,2})[\/\-\.](\d{1,4})/;
    const matchNumeric = dateString.match(regexNumeric);

    if (matchNumeric) {
        let p1 = parseInt(matchNumeric[1]);
        let p2 = parseInt(matchNumeric[2]);
        let p3 = parseInt(matchNumeric[3]);

        if (p1 > 31) { year = p1; month = p2; day = p3; }
        else if (p3 > 31) { day = p1; month = p2; year = p3; }
        else if (p3 > 1500) { day = p1; month = p2; year = p3; } // Gregorian
        else if (p3 < 1500) { day = p1; month = p2; year = p3; } // Hijri
        else { return null; }

        const lowerStr = dateString.toLowerCase();
        if (lowerStr.includes('hijri') || lowerStr.includes('هـ') || lowerStr.includes('ah')) isHijri = true;
        else if (lowerStr.includes('gregorian') || lowerStr.includes('ميلادي')) isHijri = false;
        else isHijri = (year < 1500);

    } else {
        // 2. Text Regex (Arabic months)
        const regexText = /^(\d{1,2})\s+([a-zA-Z\u0600-\u06FF]+)\s+(\d{4})$/;
        const matchText = dateString.match(regexText);

        if (matchText) {
            day = parseInt(matchText[1]);
            const monthName = matchText[2].trim();
            year = parseInt(matchText[3]);

            const monthIndex = hijriMonthsAr.indexOf(monthName);
            if (monthIndex !== -1) {
                month = monthIndex + 1;
                isHijri = true;
            } else {
                const enMonthIndex = hijriMonthsEn.map(m => m.toLowerCase()).indexOf(monthName.toLowerCase());
                if (enMonthIndex !== -1) {
                    month = enMonthIndex + 1;
                    isHijri = true;
                } else {
                    return null;
                }
            }
        } else {
            return null;
        }
    }

    if (month < 1 || month > 12) return null;
    if (day < 1 || day > 31) return null;

    let convertedDate;

    if (isHijri) {
        const gDate = toGregorian(year, month, day + offset);
        convertedDate = gDate;
    } else {
        const jsDate = new Date(year, month - 1, day + offset);
        convertedDate = toHijri(jsDate);
    }

    return {
        parsedDay: day,
        parsedMonth: month,
        parsedYear: year,
        isHijri: isHijri,
        convertedDate: convertedDate
    };
}

function exportTable() {
    const table = document.getElementById('resultsTable');
    if (table.style.display === 'none') {
        if (typeof showToast === 'function') showToast('Please convert dates first!', 'error');
        else alert('Please convert dates first!');
        return;
    }

    // FIX: Removed the URI prefix that was causing the issue
    let csvContent = "";

    // Headers
    csvContent += "Entry\teFormatted\tType\tFormat1\tFormat2\tFormat3(AR)\tFormat4(EN)\n";

    const rows = table.querySelectorAll('tbody tr');
    rows.forEach(row => {
        const cols = row.querySelectorAll('td');
        let rowData = [];
        cols.forEach((col, index) => {
            // Clean up text
            let text = col.innerText.replace(/\n/g, ' ').trim();
            // If cell is empty (invalid dates), just tab
            rowData.push(text);
        });
        csvContent += rowData.join("\t") + "\n";
    });

    navigator.clipboard.writeText(csvContent).then(() => {
        if (typeof showToast === 'function') showToast('Table copied to clipboard!', 'success');
        else alert('Table copied successfully!');
    }).catch(err => {
        console.error('Could not copy text: ', err);
        if (typeof showToast === 'function') showToast('Copy failed', 'error');
    });
}


function updateDateTime() {
    const now = new Date();

    // Gregorian Date with month number in the middle
    const gregorianWeekday = now.toLocaleDateString('en-US', { weekday: 'long' });
    const gregorianMonth = now.toLocaleDateString('en-US', { month: 'long' });
    const gregorianDay = now.getDate();
    const gregorianYear = now.getFullYear();
    const gregorianMonthNumber = now.getMonth() + 1;

    document.getElementById('gregorianDate').textContent =
        `${gregorianWeekday}, ${gregorianMonth} (${gregorianMonthNumber}) ${gregorianDay}, ${gregorianYear}`;

    // Local Time
    const timeOptions = { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true };
    document.getElementById('localTime').textContent = now.toLocaleTimeString('en-US', timeOptions);

    // Hijri Date with month number
    const hijriDate = toHijri(now);
    const hijriMonths = ['محرم', 'صفر', 'ربيع الأول', 'ربيع الثاني', 'جمادى الأولى', 'جمادى الآخرة', 'رجب', 'شعبان', 'رمضان', 'شوال', 'ذو القعدة', 'ذو الحجة'];
    document.getElementById('hijriDate').textContent = `${hijriDate.day} ${hijriMonths[hijriDate.month - 1]} (${hijriDate.month}) ${hijriDate.year} هـ`;
}

// Update time every second
setInterval(updateDateTime, 1000);
updateDateTime();

function toHijri(gregorianDate) {
    const gYear = gregorianDate.getFullYear();
    const gMonth = gregorianDate.getMonth() + 1;
    const gDay = gregorianDate.getDate();

    // More accurate conversion algorithm
    const jd = toJulian(gYear, gMonth, gDay);
    const hijriEpoch = 1948439.5; // Julian day of Hijri epoch (July 16, 622 CE)

    let hYear = Math.floor((jd - hijriEpoch) / 354.366);
    let hDay = Math.floor((jd - hijriEpoch) % 354.366);

    // Adjust for Hijri months
    const hijriMonths = [30, 29, 30, 29, 30, 29, 30, 29, 30, 29, 30, 29];
    let hMonth = 1;

    for (let i = 0; i < 12; i++) {
        if (hDay <= hijriMonths[i]) {
            break;
        }
        hDay -= hijriMonths[i];
        hMonth++;
    }

    hYear += 1; // Hijri years start from 1
    hDay += 1;  // Add 1 day as you requested

    return {
        year: hYear,
        month: hMonth,
        day: Math.floor(hDay)
    };
}

function toJulian(year, month, day) {
    // Convert Gregorian to Julian day
    if (month <= 2) {
        year -= 1;
        month += 12;
    }
    const a = Math.floor(year / 100);
    const b = Math.floor(a / 4);
    const c = 2 - a + b;
    const e = Math.floor(365.25 * (year + 4716));
    const f = Math.floor(30.6001 * (month + 1));
    return c + day + e + f - 1524.5;
}

// Clipboard function
function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(() => {
        // Optional: Show a temporary confirmation
        console.log('Copied to clipboard: ' + text);
    }).catch(err => {
        console.error('Failed to copy: ', err);
    });
}

function getDateFormats(dateInput) {
    // Create Date object from input
    let date;
    
    if (dateInput instanceof Date) {
        date = dateInput;
    } else if (typeof dateInput === 'string' || typeof dateInput === 'number') {
        date = new Date(dateInput);
    } else {
        console.error('Invalid date input. Please provide a Date object, timestamp, or date string.');
        return null;
    }
    
    // Check if date is valid
    if (isNaN(date.getTime())) {
        console.error('Invalid date provided.');
        return null;
    }
    
    // Helper function to pad numbers
    const pad = (num) => num.toString().padStart(2, '0');
    const padYear = (num) => num.toString().padStart(4, '0');
    
    // Extract date components
    const year = date.getFullYear();
    const month = date.getMonth() + 1; // 0-indexed
    const day = date.getDate();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();
    const milliseconds = date.getMilliseconds();
    
    // Day and month names
    const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 
                       'August', 'September', 'October', 'November', 'December'];
    const shortMonthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    
    // 24-hour time formats
    const time24 = `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
    const time24Short = `${pad(hours)}:${pad(minutes)}`;
    
    // 12-hour time formats
    const period = hours >= 12 ? 'PM' : 'AM';
    const hours12 = hours % 12 || 12;
    const time12 = `${pad(hours12)}:${pad(minutes)}:${pad(seconds)} ${period}`;
    const time12Short = `${pad(hours12)}:${pad(minutes)} ${period}`;
    
    // Different date formats
    const formats = {
        // ISO formats
        iso8601: date.toISOString(),
        isoDate: `${padYear(year)}-${pad(month)}-${pad(day)}`,
        
        // Standard formats
        standard: date.toLocaleDateString('en-US', { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
        }),
        standardShort: date.toLocaleDateString('en-US', { 
            year: 'numeric', 
            month: 'short', 
            day: 'numeric' 
        }),
        
        // USA formats
        usSlash: `${pad(month)}/${pad(day)}/${year}`,
        usSlashFull: `${pad(month)}/${pad(day)}/${year} ${time12Short}`,
        usFull: `${monthNames[month-1]} ${day}, ${year}`,
        usFullWithTime: `${monthNames[month-1]} ${day}, ${year} at ${time12Short}`,
        
        // European formats
        euSlash: `${pad(day)}/${pad(month)}/${year}`,
        euDot: `${pad(day)}.${pad(month)}.${year}`,
        euDash: `${pad(day)}-${pad(month)}-${year}`,
        euFull: `${day} ${monthNames[month-1]} ${year}`,
        
        // Asian formats
        asian: `${year}年${month}月${day}日`,
        asianShort: `${year}/${pad(month)}/${pad(day)}`,
        
        // File/folder friendly formats
        fileSystem: `${year}-${pad(month)}-${pad(day)}_${pad(hours)}-${pad(minutes)}`,
        fileSystemShort: `${year}${pad(month)}${pad(day)}_${pad(hours)}${pad(minutes)}`,
        
        // Database formats
        sqlDateTime: `${year}-${pad(month)}-${pad(day)} ${time24}`,
        sqlDate: `${year}-${pad(month)}-${pad(day)}`,
        
        // Readable formats
        readable: `${dayNames[date.getDay()]}, ${monthNames[month-1]} ${day}, ${year}`,
        readableWithTime: `${dayNames[date.getDay()]}, ${monthNames[month-1]} ${day}, ${year} at ${time12Short}`,
        
        // Short formats
        short: `${pad(month)}/${pad(day)}/${year.toString().slice(2)}`,
        veryShort: `${month}/${day}/${year.toString().slice(2)}`,
        
        // Time-only formats
        timeOnly24: time24,
        timeOnly12: time12Short,
        
        // Unix timestamp
        unixTimestamp: Math.floor(date.getTime() / 1000),
        jsTimestamp: date.getTime(),
        
        // RFC formats
        rfc2822: date.toUTCString(),
        rfc3339: date.toISOString(),
        
        // Custom combinations
        yyyymmdd: `${year}${pad(month)}${pad(day)}`,
        ddmmyyyy: `${pad(day)}${pad(month)}${year}`,
        mmddyyyy: `${pad(month)}${pad(day)}${year}`,
        
        // With milliseconds
        withMs: `${year}-${pad(month)}-${pad(day)} ${time24}.${milliseconds}`,
        
        // Relative time (for reference)
        relative: new Date().toLocaleDateString() === date.toLocaleDateString() ? 
                 'Today' : 
                 Math.floor((new Date() - date) / (1000 * 60 * 60 * 24)) + ' days ago'
    };
    
    // Display in console with formatting
    console.log('%c📅 DATE FORMATS OUTPUT', 'color: #3498db; font-size: 14px; font-weight: bold;');
    console.log(`%cInput Date: ${date.toString()}`, 'color: #2c3e50;');
    console.log('');
    
    console.group('%c📊 COMMON FORMATS', 'color: #27ae60; font-weight: bold;');
    console.log(`ISO 8601:        ${formats.iso8601}`);
    console.log(`Standard:        ${formats.standard}`);
    console.log(`US (MM/DD/YYYY): ${formats.usSlash}`);
    console.log(`EU (DD/MM/YYYY): ${formats.euSlash}`);
    console.groupEnd();
    
    console.group('%c⏰ TIME FORMATS', 'color: #e74c3c; font-weight: bold;');
    console.log(`12-hour: ${formats.timeOnly12}`);
    console.log(`24-hour: ${formats.timeOnly24}`);
    console.log(`SQL DateTime: ${formats.sqlDateTime}`);
    console.groupEnd();
    
    console.group('%c💾 TECHNICAL FORMATS', 'color: #9b59b6; font-weight: bold;');
    console.log(`File System:    ${formats.fileSystem}`);
    console.log(`Unix Timestamp: ${formats.unixTimestamp}`);
    console.log(`JS Timestamp:   ${formats.jsTimestamp}`);
    console.log(`YYYYMMDD:       ${formats.yyyymmdd}`);
    console.groupEnd();
    
    console.group('%c📋 ALL FORMATS', 'color: #f39c12; font-weight: bold;');
    Object.entries(formats).forEach(([key, value]) => {
        console.log(`${key.padEnd(20)}: ${value}`);
    });
    console.groupEnd();
    
    console.log('%c✨ All formats logged successfully!', 'color: #2ecc71; font-weight: bold;');
    
    return formats;
}
/*
// Usage examples:
console.log('=== Example 1: Current Date ===');
getDateFormats(new Date());

console.log('\n=== Example 2: Specific Date String ===');
getDateFormats('2024-12-25');

console.log('\n=== Example 3: Timestamp ===');
getDateFormats(1704038400000); // Dec 31, 2023 timestamp

console.log('\n=== Example 4: Various Input Formats ===');
getDateFormats('December 25, 2024');
getDateFormats('2024/12/25');
getDateFormats('12-25-2024');

// Function to test with specific date
function testDateFormats() {
    const testDate = new Date(2024, 11, 25, 14, 30, 45); // Dec 25, 2024, 2:30:45 PM
    console.log('\n=== Example 5: Christmas 2024 ===');
    return getDateFormats(testDate);
}

// Run test
testDateFormats();
*/
function loadAboutImages() {
    const container = document.getElementById('aboutImages');

    DATA.aboutImages.forEach(img => {
        const wrapper = document.createElement('div');
        wrapper.className = 'image-wrapper';
        wrapper.onclick = () => openModal(img);
        wrapper.innerHTML = `<img src="${img}" alt="Application Screenshot">`;
        container.appendChild(wrapper);
    });
}
// Copyright years
const startYear = 2021;
const currentYear = new Date().getFullYear();
document.getElementById('copyrightYears').textContent = startYear === currentYear ? currentYear : `${startYear}-${currentYear}`;

// Toggle mobile menu
function toggleMobileMenu() {
    const navLinks = document.getElementById('navLinks');
    navLinks.classList.toggle('active');
}

// Smooth scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const navHeight = document.querySelector('nav').offsetHeight;
            const dateBarHeight = document.querySelector('.date-bar').offsetHeight;
            const offsetPosition = target.offsetTop - navHeight - dateBarHeight + 20;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
            document.getElementById('navLinks').classList.remove('active');
        }
    });
});

// Scroll to top button
window.addEventListener('scroll', () => {
    const scrollTop = document.getElementById('scrollTop');
    if (window.pageYOffset > 300) {
        scrollTop.classList.add('visible');
    } else {
        scrollTop.classList.remove('visible');
    }
});

function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Image Modal Functions (WITH ZOOM FIX)
function openModal(imageSrc) {
    const modal = document.getElementById('imageModal');
    const modalImg = document.getElementById('modalImage');

    if (!modal || !modalImg) return;

    // Reset zoom state on new open
    modalImg.classList.remove('zoomed');

    modal.style.display = "flex";
    // Allow time for display:flex to apply before adding active class for animation
    setTimeout(() => {
        modal.classList.add('active');
    }, 10);

    modalImg.src = imageSrc;
    document.body.style.overflow = "hidden";
}

function closeModal() {
    const modal = document.getElementById('imageModal');
    const modalImg = document.getElementById('modalImage');

    if (modalImg) modalImg.classList.remove('zoomed');

    if (modal) {
        modal.classList.remove('active');
        setTimeout(() => {
            modal.style.display = "none";
            document.body.style.overflow = "auto";
        }, 300);
    }
}


// Load Downloads
function loadDownloads() {
    const container = document.getElementById('downloadGrid');
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    DATA.downloads.forEach(app => {
        const card = document.createElement('div');
        card.className = 'download-card';

        // Check if links exist and are not empty
        const has32bit = app.link32 && app.link32.trim() !== '';
        const has64bit = app.link64 && app.link64.trim() !== '';

        // Create button HTML based on availability
        const button32 = has32bit
            ? `<a href="${app.link32}" class="btn btn-primary" download>📥 32-bit</a>`
            : `<button class="btn btn-primary btn-disabled" disabled>📥 32-bit</button>`;

        const button64 = has64bit
            ? `<a href="${app.link64}" class="btn btn-primary" download>📥 64-bit</a>`
            : `<button class="btn btn-primary btn-disabled" disabled>📥 64-bit</button>`;

        // Check if release is new (within 3 days from release date)
        let isNew = false;
        if (app.released) {
            try {
                // Try different date formats
                const releaseDate = parseDate(app.released);
                if (releaseDate) {
                    // Calculate difference in milliseconds
                    const diffTime = today.getTime() - releaseDate.getTime();
                    // Convert to days (absolute value)
                    const diffDays = Math.abs(Math.floor(diffTime / (1000 * 60 * 60 * 24)));

                    // Check if within 3 days
                    isNew = diffDays <= 3;
                }
            } catch (error) {
                console.error(`Error parsing date for ${app.name}:`, error);
            }
        }

        const newBadge = isNew ? '<span class="new-badge">🤍 NEW</span>' : '';

        card.innerHTML = `
            <h3>${app.name} V ${app.version || 'N/A'} ${newBadge}</h3>
            <p>Released : ${app.released || 'N/A'}</p>
            <p>${app.description || ''}</p>
            <div class="download-buttons">
                ${button32}
                ${button64}
            </div>
        `;
        container.appendChild(card);
    });
}

// Helper function to parse dates in different formats
function parseDate(dateString) {
    // Try standard ISO format first
    let date = new Date(dateString);
    if (!isNaN(date.getTime())) {
        date.setHours(0, 0, 0, 0);
        return date;
    }

    // Try MM/DD/YYYY or DD/MM/YYYY
    const parts = dateString.split(/[/\-.]/);
    if (parts.length === 3) {
        // Try different arrangements
        const formats = [
            new Date(`${parts[2]}-${parts[1]}-${parts[0]}`), // DD/MM/YYYY
            new Date(`${parts[2]}-${parts[0]}-${parts[1]}`), // MM/DD/YYYY
            new Date(`${parts[0]}-${parts[1]}-${parts[2]}`), // YYYY-MM-DD
        ];

        for (const format of formats) {
            if (!isNaN(format.getTime())) {
                format.setHours(0, 0, 0, 0);
                return format;
            }
        }
    }

    return null;
}

// Global variable for shortcuts sorting
let currentSortOrder = 'asc';
let currentFilter = 'all';
let allShortcuts = [];

// Load Shortcuts - REPLACE THE ENTIRE FUNCTION
function loadShortcuts() {
    allShortcuts = [...DATA.shortcuts];
    const container = document.getElementById('shortcutsContainer');

    // Get unique groups
    const groups = ['all', ...new Set(DATA.shortcuts.map(s => s.groupBy).filter(Boolean))];

    // Create controls
    const controlsHTML = `
        <div class="shortcuts-controls">
            <div class="filter-group">
                <label>Filter by Group:</label>
                <select id="groupFilter" onchange="filterShortcuts()">
                    ${groups.map(g => `<option value="${g}">${g === 'all' ? 'All Groups' : g}</option>`).join('')}
                </select>
            </div>
            <div class="sort-buttons">
                <button class="sort-btn active" onclick="sortShortcuts('asc')" title="Sort Ascending">↑</button>
                <button class="sort-btn" onclick="sortShortcuts('desc')" title="Sort Descending">↓</button>
            </div>
        </div>
        <div id="shortcutsList"></div>
    `;

    container.innerHTML = controlsHTML;
    renderShortcuts();
}

function filterShortcuts() {
    currentFilter = document.getElementById('groupFilter').value;
    renderShortcuts();
}

function sortShortcuts(order) {
    currentSortOrder = order;

    // Update button active state
    document.querySelectorAll('.sort-btn').forEach(btn => btn.classList.remove('active'));
    event.target.classList.add('active');

    renderShortcuts();
}

function renderShortcuts() {
    let shortcuts = [...allShortcuts];

    // Filter
    if (currentFilter !== 'all') {
        shortcuts = shortcuts.filter(s => s.groupBy === currentFilter);
    }

    // Sort
    shortcuts.sort((a, b) => {
        const aIndex = a.index || 0;
        const bIndex = b.index || 0;
        return currentSortOrder === 'asc' ? aIndex - bIndex : bIndex - aIndex;
    });

    const listContainer = document.getElementById('shortcutsList');
    listContainer.innerHTML = '';

    shortcuts.forEach((shortcut, index) => {
        const item = document.createElement('div');
        item.className = 'shortcut-item';

        const hasDetails = shortcut.details || (shortcut.images && shortcut.images.length > 0);

        let imagesHTML = '';
        if (shortcut.images && shortcut.images.length > 0) {
            imagesHTML = '<div class="images-container">';
            shortcut.images.forEach(img => {
                imagesHTML += `
                    <div class="image-wrapper" onclick="openModal('${img}')">
                        <img src="${img}" alt="Screenshot">
                    </div>
                `;
            });
            imagesHTML += '</div>';
        }

        const groupBadge = shortcut.groupBy ? `<span style="background: #ff7700; color: white; padding: 4px 10px; border-radius: 5px; font-size: 0.8em; margin-left: 10px;">${shortcut.groupBy}</span>` : '';
        // <div class="shortcut-key">${shortcut.key} ${groupBadge}</div>
        item.innerHTML = `
            <div class="shortcut-header">
                <div class="shortcut-key">${shortcut.key}</div>
                <div class="shortcut-desc">
                    <div class="desc-ar">${shortcut.descriptionAr.replace(/\n/g, '<br>')}</div>
                    <div class="desc-en">${shortcut.descriptionEn.replace(/\n/g, '<br>')}</div>
                </div>
                ${hasDetails ? `<button class="toggle-btn" onclick="toggleDetails(${shortcut.index || index})">▼ More</button>` : ''}
            </div>
            ${hasDetails ? `
            <div class="shortcut-details" id="details-${shortcut.index || index}">
                ${shortcut.details ? `<p>${shortcut.details.replace(/\n/g, '<br>')}</p>` : ''}
                ${imagesHTML}
            </div>
            ` : ''}
        `;
        listContainer.appendChild(item);
    });
}

// Toggle shortcut details
function toggleDetails(index) {
    const details = document.getElementById(`details-${index}`);
    const btn = event.target;

    details.classList.toggle('active');
    btn.classList.toggle('active');

    if (details.classList.contains('active')) {
        btn.textContent = '▲ Less';
    } else {
        btn.textContent = '▼ More';
    }
}

// Load Bookmarklets
function loadBookmarklets() {
    const container = document.getElementById('bookmarkletsContainer');

    DATA.bookmarklets.forEach((bookmarklet, index) => {
        const item = document.createElement('div');
        item.className = 'bookmarklet-item';

        item.innerHTML = `
                    <div class="bookmarklet-title">${bookmarklet.title}</div>
                    <div class="bookmarklet-description">${bookmarklet.description}</div>
                    <div class="bookmarklet-code">${bookmarklet.code}</div>
                    <div class="bookmarklet-actions">
                        <button class="btn btn-primary copy-btn" onclick="copyBookmarklet(${index})">📋 Copy Code</button>
                        <a href="${bookmarklet.code}" class="btn btn-bookmark" onclick="return false;" ondragstart="return true;">📌 Drag to Bookmarks Bar</a>
                    </div>
                `;
        container.appendChild(item);
    });
}

// Copy bookmarklet code
function copyBookmarklet(index) {
    const code = DATA.bookmarklets[index].code;

    navigator.clipboard.writeText(code).then(() => {
        const btn = event.target;
        const originalText = btn.textContent;
        btn.textContent = '✓ Copied!';
        btn.classList.add('copied');

        setTimeout(() => {
            btn.textContent = originalText;
            btn.classList.remove('copied');
        }, 2000);
    });
}

// Load Links
function loadLinks() {
    const container = document.getElementById('linksContainer');

    DATA.links.forEach(link => {
        const item = document.createElement('div');
        item.className = 'link-item';
        item.innerHTML = `<a href="${link.url}" target="_blank">${link.name}</a>`;
        container.appendChild(item);
    });
}

// Load Code Snippets
function loadCodes() {
    const container = document.getElementById('codeContainer');

    DATA.codes.forEach((code, index) => {
        const item = document.createElement('div');
        item.className = 'code-item';

        let variablesHTML = '';
        if (code.variables && code.variables.length > 0) {
            variablesHTML = '<div class="code-variables">';
            code.variables.forEach(variable => {
                if (variable.type === 'text') {
                    variablesHTML += `
                                <div class="variable-input">
                                    <label>${variable.label}:</label>
                                    <input type="text" id="var-${index}-${variable.name}" placeholder="${variable.placeholder || ''}" value="${variable.default || ''}">
                                </div>
                            `;
                } else if (variable.type === 'checkbox') {
                    variablesHTML += `
                                <div class="variable-input">
                                    <label>${variable.label}:</label>
                                    <input type="checkbox" id="var-${index}-${variable.name}" ${variable.default ? 'checked' : ''}>
                                </div>
                            `;
                } else if (variable.type === 'select') {
                    variablesHTML += `
                                <div class="variable-input">
                                    <label>${variable.label}:</label>
                                    <select id="var-${index}-${variable.name}">
                                        ${variable.options.map(opt => `<option value="${opt}" ${opt === variable.default ? 'selected' : ''}>${opt}</option>`).join('')}
                                    </select>
                                </div>
                            `;
                }
            });
            variablesHTML += '</div>';
        }

        item.innerHTML = `
                    <div class="code-header">
                        <div class="code-title">${code.title}</div>
                    </div>
                    ${variablesHTML}
                    <div class="code-display" id="code-${index}">${code.template}</div>
                    <button class="copy-btn" onclick="copyCode(${index})">📋 Copy Code</button>
                `;
        container.appendChild(item);

        // Add event listeners for variables
        if (code.variables) {
            code.variables.forEach(variable => {
                const input = document.getElementById(`var-${index}-${variable.name}`);
                if (input) {
                    input.addEventListener('input', () => updateCode(index, code));
                    input.addEventListener('change', () => updateCode(index, code));
                }
            });

            // Initial update
            updateCode(index, code);
        }
    });
}

// Update code with variables
function updateCode(index, codeData) {
    let code = codeData.template;

    if (codeData.variables) {
        codeData.variables.forEach(variable => {
            const input = document.getElementById(`var-${index}-${variable.name}`);
            let value = '';

            if (variable.type === 'checkbox') {
                value = input.checked ? (variable.trueValue || 'true') : (variable.falseValue || 'false');
            } else {
                value = input.value;
            }

            const placeholder = `{{${variable.name}}}`;
            code = code.split(placeholder).join(value);
        });
    }

    document.getElementById(`code-${index}`).textContent = code;
}

// Copy code to clipboard
function copyCode(index) {
    const codeElement = document.getElementById(`code-${index}`);
    const code = codeElement.textContent;

    navigator.clipboard.writeText(code).then(() => {
        const btn = event.target;
        const originalText = btn.textContent;
        btn.textContent = '✓ Copied!';
        btn.classList.add('copied');

        setTimeout(() => {
            btn.textContent = originalText;
            btn.classList.remove('copied');
        }, 2000);
    });
}


// Initialize
document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById('imageModal');
    const modalImg = document.getElementById('modalImage');
    const closeBtn = document.querySelector('.modal-close');
    const tbody = document.getElementById('tableBody');
    loadAllData();

    if (tbody) {
        tbody.addEventListener('click', function (e) {
            // Check if user clicked inside a TD (data cell)
            if (e.target.tagName === 'TD') {
                const cell = e.target;
                const textToCopy = cell.innerText;

                // Copy to clipboard
                navigator.clipboard.writeText(textToCopy).then(() => {

                    // 1. Show Toast (if you have the function)
                    if (typeof showToast === 'function') {
                        showToast('Copied: ' + textToCopy, 'success');
                    } else {
                        // Fallback alert if toast isn't set up
                        console.log('Copied: ' + textToCopy);
                    }

                    // 2. Flash the cell green briefly
                    cell.classList.add('copied-flash');
                    setTimeout(() => {
                        cell.classList.remove('copied-flash');
                    }, 300);

                }).catch(err => {
                    console.error('Failed to copy: ', err);
                });
            }
        });
    }
    
    if (modal && modalImg) {
        // Click Image to Zoom
        modalImg.addEventListener('click', function (e) {
            e.stopPropagation(); // Prevent closing modal
            this.classList.toggle('zoomed');
        });

        // Click Background to Close
        modal.addEventListener('click', function (e) {
            if (e.target === modal) {
                closeModal();
            }
        });

        // Click X to Close
        if (closeBtn) {
            closeBtn.addEventListener('click', closeModal);
        }
    }

    // Add click event listeners for date/time copying
    document.getElementById('gregorianDate').addEventListener('click', function () {
        const now = new Date();
        const year = now.getFullYear();
        const month = String(now.getMonth() + 1).padStart(2, '0');
        const day = String(now.getDate()).padStart(2, '0');
        const dateString = `${year}-${month}-${day}`;
        copyToClipboard(dateString);
        showToast('Gregorian Date Copied to clipboard!', 'success');
    });

    document.getElementById('hijriDate').addEventListener('click', function () {
        const now = new Date();
        const hijriDate = toHijri(now);
        const year = hijriDate.year;
        const month = String(hijriDate.month).padStart(2, '0');
        const day = String(hijriDate.day).padStart(2, '0');
        const dateString = `${year}-${month}-${day}`;
        copyToClipboard(dateString);

        showToast('Hijri Date Copied to clipboard!', 'success');
    });

    document.getElementById('localTime').addEventListener('click', function () {
        const now = new Date();
        const timeString = now.toLocaleTimeString('en-US', { hour14: false });
        copyToClipboard(timeString);

        showToast('Time Copied to clipboard!', 'success');
    });
});




