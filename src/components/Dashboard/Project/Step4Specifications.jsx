"use client";

const projectTypeOptions = [
    "Animation", "Documentary", "Experimental", "Feature", "Music Video",
    "Short", "Student", "Television", "Web / New Media", "Other"
];

const countries = [
    "Afghanistan", "Albania", "Algeria", "American Samoa", "Andorra", "Angola", "Anguilla",
    "Antarctica", "Antigua and Barbuda", "Argentina", "Armenia", "Aruba", "Australia", "Austria",
    "Azerbaijan", "Bahamas", "Bahrain", "Bangladesh", "Barbados", "Belarus", "Belgium", "Belize",
    "Benin", "Bermuda", "Bhutan", "Bolivia", "Bosnia and Herzegovina", "Botswana", "Brazil",
    "Brunei", "Bulgaria", "Burkina Faso", "Burundi", "Cabo Verde", "Cambodia", "Cameroon",
    "Canada", "Chad", "Chile", "China", "Colombia", "Comoros", "Congo", "Costa Rica",
    "Croatia", "Cuba", "Cyprus", "Czech Republic", "Denmark", "Djibouti", "Dominica",
    "Dominican Republic", "Ecuador", "Egypt", "El Salvador", "Equatorial Guinea", "Eritrea",
    "Estonia", "Eswatini", "Ethiopia", "Fiji", "Finland", "France", "Gabon", "Gambia",
    "Georgia", "Germany", "Ghana", "Greece", "Grenada", "Guatemala", "Guinea", "Guinea-Bissau",
    "Guyana", "Haiti", "Honduras", "Hungary", "Iceland", "India", "Indonesia", "Iran", "Iraq",
    "Ireland", "Israel", "Italy", "Jamaica", "Japan", "Jordan", "Kazakhstan", "Kenya",
    "Kiribati", "Kuwait", "Kyrgyzstan", "Laos", "Latvia", "Lebanon", "Lesotho", "Liberia",
    "Libya", "Liechtenstein", "Lithuania", "Luxembourg", "Madagascar", "Malawi", "Malaysia",
    "Maldives", "Mali", "Malta", "Marshall Islands", "Mauritania", "Mauritius", "Mexico",
    "Micronesia", "Moldova", "Monaco", "Mongolia", "Montenegro", "Morocco", "Mozambique",
    "Myanmar", "Namibia", "Nauru", "Nepal", "Netherlands", "New Zealand", "Nicaragua", "Niger",
    "Nigeria", "North Korea", "North Macedonia", "Norway", "Oman", "Pakistan", "Palau",
    "Palestine", "Panama", "Papua New Guinea", "Paraguay", "Peru", "Philippines", "Poland",
    "Portugal", "Qatar", "Romania", "Russia", "Rwanda", "Saint Kitts and Nevis", "Saint Lucia",
    "Saint Vincent and the Grenadines", "Samoa", "San Marino", "Sao Tome and Principe",
    "Saudi Arabia", "Senegal", "Serbia", "Seychelles", "Sierra Leone", "Singapore", "Slovakia",
    "Slovenia", "Solomon Islands", "Somalia", "South Africa", "South Korea", "South Sudan",
    "Spain", "Sri Lanka", "Sudan", "Suriname", "Sweden", "Switzerland", "Syria", "Taiwan",
    "Tajikistan", "Tanzania", "Thailand", "Timor-Leste", "Togo", "Tonga", "Trinidad and Tobago",
    "Tunisia", "Turkey", "Turkmenistan", "Tuvalu", "Uganda", "Ukraine", "United Arab Emirates",
    "United Kingdom", "United States", "Uruguay", "Uzbekistan", "Vanuatu", "Vatican City",
    "Venezuela", "Vietnam", "Yemen", "Zambia", "Zimbabwe"
];

const languages = [
    "Afrikaans", "Albanian", "Amharic", "Arabic", "Armenian", "Assamese", "Aymara", "Azerbaijani",
    "Bambara", "Basque", "Belarusian", "Bengali", "Bhojpuri", "Bosnian", "Bulgarian", "Burmese",
    "Catalan", "Cebuano", "Chinese", "Croatian", "Czech", "Danish", "Dutch", "English", "Esperanto",
    "Estonian", "Faroese", "Fijian", "Finnish", "French", "Galician", "Georgian", "German",
    "Greek", "Gujarati", "Haitian Creole", "Hausa", "Hawaiian", "Hebrew", "Hindi", "Hmong",
    "Hungarian", "Icelandic", "Igbo", "Indonesian", "Irish", "Italian", "Japanese", "Javanese",
    "Kannada", "Kazakh", "Khmer", "Kinyarwanda", "Korean", "Kurdish", "Kyrgyz", "Lao", "Latin",
    "Latvian", "Lithuanian", "Luxembourgish", "Macedonian", "Malagasy", "Malay", "Malayalam",
    "Maltese", "Maori", "Marathi", "Mongolian", "Nepali", "Norwegian", "Odia", "Oromo", "Pashto",
    "Persian", "Polish", "Portuguese", "Punjabi", "Quechua", "Romanian", "Russian", "Samoan",
    "Sanskrit", "Scottish Gaelic", "Serbian", "Shona", "Sindhi", "Sinhala", "Slovak", "Slovenian",
    "Somali", "Spanish", "Sundanese", "Swahili", "Swedish", "Tagalog", "Tajik", "Tamil", "Tatar",
    "Telugu", "Thai", "Tibetan", "Tigrinya", "Tongan", "Turkish", "Turkmen", "Ukrainian", "Urdu",
    "Uyghur", "Uzbek", "Vietnamese", "Welsh", "Wolof", "Xhosa", "Yiddish", "Yoruba", "Zulu"
];

const aspectRatios = ["16:9", "4:3", "1.85:1", "2.35:1", "2.39:1", "Other"];

const filmColors = ["Color", "Black and White", "Mixed"];

export default function Step4Specifications({ formData, updateFormData, onNext, onPrev }) {
    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        
        if (type === "checkbox") {
            if (name === "projectTypes") {
                const currentTypes = [...formData.projectTypes];
                if (checked) {
                    currentTypes.push(value);
                } else {
                    const index = currentTypes.indexOf(value);
                    if (index > -1) currentTypes.splice(index, 1);
                }
                updateFormData({ projectTypes: currentTypes });
            }
        } else {
            updateFormData({ [name]: value });
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onNext();
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Specifications</h2>
            
            {/* Project Type (Multiple Select) */}
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                    Project Type <span className="text-red-500">*</span>
                    <span className="text-xs text-gray-500 ml-2">(Select all that apply)</span>
                </label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {projectTypeOptions.map((type) => (
                        <label key={type} className="flex items-center space-x-2">
                            <input
                                type="checkbox"
                                value={type}
                                checked={formData.projectTypes.includes(type)}
                                onChange={handleChange}
                                className="h-4 w-4 text-[#1EB97A] focus:ring-[#1EB97A] border-gray-300 rounded"
                            />
                            <span className="text-sm text-gray-700">{type}</span>
                        </label>
                    ))}
                </div>
            </div>
            
            {/* Genres */}
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                    Genres
                </label>
                <input
                    type="text"
                    name="genres"
                    value={formData.genres}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border text-black border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                    placeholder="Sci-Fi, Romance, Drama, etc"
                />
            </div>
            
            {/* Runtime */}
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                    Runtime
                </label>
                <div className="grid grid-cols-3 gap-2">
                    <div>
                        <input
                            type="number"
                            name="runtimeHours"
                            value={formData.runtimeHours}
                            onChange={handleChange}
                            min="0"
                            max="99"
                            className="w-full px-3 py-2 border text-black border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-center"
                            placeholder="HH"
                        />
                        <p className="text-xs text-gray-500 mt-1 text-center">Hours</p>
                    </div>
                    <div>
                        <input
                            type="number"
                            name="runtimeMinutes"
                            value={formData.runtimeMinutes}
                            onChange={handleChange}
                            min="0"
                            max="59"
                            className="w-full px-3 py-2 border text-black border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-center"
                            placeholder="MM"
                        />
                        <p className="text-xs text-gray-500 mt-1 text-center">Minutes</p>
                    </div>
                    <div>
                        <input
                            type="number"
                            name="runtimeSeconds"
                            value={formData.runtimeSeconds}
                            onChange={handleChange}
                            min="0"
                            max="59"
                            className="w-full px-3 py-2 border text-black border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-center"
                            placeholder="SS"
                        />
                        <p className="text-xs text-gray-500 mt-1 text-center">Seconds</p>
                    </div>
                </div>
            </div>
            
            {/* Completion Date */}
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                    Completion Date
                </label>
                <input
                    type="date"
                    name="completionDate"
                    value={formData.completionDate}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border text-black border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                />
            </div>
            
            {/* Production Budget */}
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                    Production Budget
                </label>
                <div className="relative">
                    <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">$</span>
                    <input
                        type="number"
                        name="productionBudget"
                        value={formData.productionBudget}
                        onChange={handleChange}
                        className="w-full pl-8 pr-4 py-2 border text-black border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                        placeholder="10000"
                    />
                </div>
                <p className="text-xs text-gray-500 mt-1">USD</p>
            </div>
            
            {/* Country of Origin */}
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                    Country of Origin
                </label>
                <select
                    name="countryOfOrigin"
                    value={formData.countryOfOrigin}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border text-black border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                >
                    <option value="">Select country</option>
                    {countries.map((country) => (
                        <option key={country} value={country}>{country}</option>
                    ))}
                </select>
            </div>
            
            {/* Country of Filming */}
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                    Country of Filming
                </label>
                <select
                    name="countryOfFilming"
                    value={formData.countryOfFilming}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border text-black border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                >
                    <option value="">Select country</option>
                    {countries.map((country) => (
                        <option key={country} value={country}>{country}</option>
                    ))}
                </select>
            </div>
            
            {/* Language */}
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                    Language
                </label>
                <select
                    name="language"
                    value={formData.language}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border text-black border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                >
                    <option value="">Select language</option>
                    {languages.map((language) => (
                        <option key={language} value={language}>{language}</option>
                    ))}
                </select>
            </div>
            
            {/* Shooting Format */}
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                    Shooting Format
                </label>
                <input
                    type="text"
                    name="shootingFormat"
                    value={formData.shootingFormat}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border text-black border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                    placeholder="Digital, 35mm, RED, etc."
                />
            </div>
            
            {/* Aspect Ratio */}
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                    Aspect Ratio
                </label>
                <select
                    name="aspectRatio"
                    value={formData.aspectRatio}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border text-black border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                >
                    {aspectRatios.map((ratio) => (
                        <option key={ratio} value={ratio}>{ratio}</option>
                    ))}
                </select>
            </div>
            
            {/* Film Color */}
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                    Film Color
                </label>
                <select
                    name="filmColor"
                    value={formData.filmColor}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border text-black border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                >
                    {filmColors.map((color) => (
                        <option key={color} value={color}>{color}</option>
                    ))}
                </select>
            </div>
            
            {/* Student Project */}
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                    Student Project
                </label>
                <div className="flex gap-4">
                    <label className="flex items-center space-x-2">
                        <input
                            type="radio"
                            name="studentProject"
                            value="Yes"
                            checked={formData.studentProject === "Yes"}
                            onChange={handleChange}
                            className="h-4 w-4 text-[#1EB97A] focus:ring-[#1EB97A]"
                        />
                        <span>Yes</span>
                    </label>
                    <label className="flex items-center space-x-2">
                        <input
                            type="radio"
                            name="studentProject"
                            value="No"
                            checked={formData.studentProject === "No"}
                            onChange={handleChange}
                            className="h-4 w-4 text-[#1EB97A] focus:ring-[#1EB97A]"
                        />
                        <span>No</span>
                    </label>
                </div>
            </div>
            
            {/* First-time Filmmaker */}
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                    First-time Filmmaker
                </label>
                <div className="flex gap-4">
                    <label className="flex items-center space-x-2">
                        <input
                            type="radio"
                            name="firstTimeFilmmaker"
                            value="Yes"
                            checked={formData.firstTimeFilmmaker === "Yes"}
                            onChange={handleChange}
                            className="h-4 w-4 text-[#1EB97A] focus:ring-[#1EB97A]"
                        />
                        <span>Yes</span>
                    </label>
                    <label className="flex items-center space-x-2">
                        <input
                            type="radio"
                            name="firstTimeFilmmaker"
                            value="No"
                            checked={formData.firstTimeFilmmaker === "No"}
                            onChange={handleChange}
                            className="h-4 w-4 text-[#1EB97A] focus:ring-[#1EB97A]"
                        />
                        <span>No</span>
                    </label>
                </div>
            </div>
            
            {/* Navigation Buttons */}
            <div className="flex justify-between pt-4">
                <button
                    type="button"
                    onClick={onPrev}
                    className="px-6 py-2.5 border  border-gray-300 rounded-md font-semibold text-gray-700 hover:bg-gray-50 transition-all"
                >
                    ← Previous
                </button>
                <button
                    type="submit"
                    className="bg-[#1EB97A] hover:bg-[#189663] text-white px-6 py-2.5 rounded-md font-semibold transition-all"
                >
                    Next Step →
                </button>
            </div>
        </form>
    );
}