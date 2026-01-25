import {
    EnvelopeIcon,
    PhoneIcon,
    MapPinIcon,
    ChatBubbleLeftRightIcon,
    HashtagIcon,
    PhotoIcon,
    UserGroupIcon,
    GlobeAltIcon,
    DevicePhoneMobileIcon,
} from "@heroicons/react/24/outline";

const Footer = ({ variant = "default" }) => {
    const currentYear = new Date().getFullYear();

    const variants = {
        default: "bg-gray-50 border-t border-gray-200",
        dark: "bg-gray-800 text-white",
        primary: "bg-blue-600 text-white",
        minimal: "bg-transparent border-t",
    };

    const textColor = {
        default: "text-gray-600 hover:text-gray-900",
        dark: "text-gray-300 hover:text-white",
        primary: "text-blue-100 hover:text-white",
        minimal: "text-gray-600 hover:text-gray-900",
    };

    // Sử dụng icon có sẵn
    const socialLinks = [
        { icon: ChatBubbleLeftRightIcon, href: "#", label: "Facebook" },
        { icon: HashtagIcon, href: "#", label: "Twitter" },
        { icon: PhotoIcon, href: "#", label: "Instagram" },
        { icon: UserGroupIcon, href: "#", label: "LinkedIn" },
    ];

    const contactInfo = [
        { icon: PhoneIcon, text: "+1 (555) 123-4567" },
        { icon: EnvelopeIcon, text: "contact@example.com" },
        { icon: MapPinIcon, text: "123 Street, City, Country" },
    ];

    const footerLinks = [
        {
            title: "Company",
            links: [
                { label: "About Us", href: "#" },
                { label: "Careers", href: "#" },
                { label: "Press", href: "#" },
            ],
        },
        {
            title: "Support",
            links: [
                { label: "Help Center", href: "#" },
                { label: "Contact Us", href: "#" },
                { label: "FAQ", href: "#" },
            ],
        },
        {
            title: "Legal",
            links: [
                { label: "Privacy Policy", href: "#" },
                { label: "Terms of Service", href: "#" },
                { label: "Cookie Policy", href: "#" },
            ],
        },
    ];

    return (
        <footer className={`${variants[variant]} py-8 md:py-12`}>
            <div className="container mx-auto px-4">
                {/* Top Section */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
                    {/* Brand Info */}
                    <div>
                        <h3 className="text-xl font-bold mb-4">Your Brand</h3>
                        <p className={`text-sm ${textColor[variant]}`}>
                            Building amazing products with passion and
                            dedication since {currentYear - 5}.
                        </p>
                    </div>

                    {/* Quick Links */}
                    {footerLinks.map((section, index) => (
                        <div key={index}>
                            <h4 className="font-semibold mb-4">
                                {section.title}
                            </h4>
                            <ul className="space-y-2">
                                {section.links.map((link, linkIndex) => (
                                    <li key={linkIndex}>
                                        <a
                                            href={link.href}
                                            className={`text-sm ${textColor[variant]} transition-colors`}
                                        >
                                            {link.label}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                {/* Middle Section - Contact & Social */}
                <div className="border-t pt-8 mb-8">
                    <div className="flex flex-col md:flex-row justify-between items-center space-y-6 md:space-y-0">
                        {/* Contact Info */}
                        <div className="flex flex-wrap gap-4">
                            {contactInfo.map((info, index) => (
                                <div
                                    key={index}
                                    className="flex items-center space-x-2"
                                >
                                    <info.icon
                                        className={`h-5 w-5 ${textColor[variant]}`}
                                    />
                                    <span
                                        className={`text-sm ${textColor[variant]}`}
                                    >
                                        {info.text}
                                    </span>
                                </div>
                            ))}
                        </div>

                        {/* Social Links */}
                        <div className="flex space-x-4">
                            {socialLinks.map((social, index) => (
                                <a
                                    key={index}
                                    href={social.href}
                                    className={`p-2 rounded-full ${
                                        variant === "default"
                                            ? "bg-gray-100 hover:bg-gray-200"
                                            : "bg-gray-700 hover:bg-gray-600"
                                    } transition-colors`}
                                    aria-label={social.label}
                                >
                                    <social.icon className="h-5 w-5" />
                                </a>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Bottom Section */}
                <div className="flex flex-col md:flex-row items-center justify-between pt-6 border-t">
                    <div
                        className={`text-sm ${textColor[variant]} mb-4 md:mb-0`}
                    >
                        &copy; {currentYear} Your Website. All rights reserved.
                    </div>

                    <div className="flex items-center space-x-4">
                        <a
                            href="#"
                            className={`text-sm ${textColor[variant]} transition-colors`}
                        >
                            Privacy Policy
                        </a>
                        <span className={`${textColor[variant]}`}>•</span>
                        <a
                            href="#"
                            className={`text-sm ${textColor[variant]} transition-colors`}
                        >
                            Terms &amp; Conditions
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
