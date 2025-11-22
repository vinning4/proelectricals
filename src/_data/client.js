module.exports = {
    name: "ProElectricals",
    email: "contact@proelectricals.com",
    phoneForTel: "0455-559-394",
    phoneFormatted: "(0455) 559 394",
    address: {
        lineOne: "404 Neerim Lane",
        lineTwo: "#Suite 9",
        city: "Preston",
        state: "VIC",
        zip: "3072",
        country: "AU",
        mapLink: "",
    },
    socials: {
        facebook: "https://www.facebook.com/",
        instagram: "https://www.instagram.com/",
    },
    //! Make sure you include the file protocol (e.g. https://) and that NO TRAILING SLASH is included
    domain: "https://www.example.com",
    // Passing the isProduction variable for use in HTML templates
    isProduction: process.env.ELEVENTY_ENV === "PROD",
};
