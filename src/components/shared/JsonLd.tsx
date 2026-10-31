import React from "react";

export function JsonLd() {
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": "https://majharulislamsifat.com/#person",
        "name": "Majharul Islam Sifat",
        "givenName": "Majharul Islam",
        "familyName": "Sifat",
        "jobTitle": "Junior Software Engineer",
        "worksFor": {
          "@type": "Organization",
          "name": "Archgig",
        },
        "description": "Junior Software Engineer at Archgig, CST Diploma student, MERN stack developer, and digital content creator.",
        "url": "https://majharulislamsifat.com",
        "image": "https://majharulislamsifat.com/assets/personal/profile-portrait.png",
        "email": "majharulislamsifat93@gmail.com",
        "telephone": "+8801638090793",
        "address": {
          "@type": "PostalAddress",
          "addressLocality": "Dhaka",
          "addressCountry": "Bangladesh",
        },
        "sameAs": [
          "https://github.com/mi-sifat",
          "https://www.linkedin.com/in/majharulislamsifat93/",
          "https://www.youtube.com/channel/UCD8FOEQ-yTH19DMjZkwSCLw",
          "https://www.facebook.com/majharulislam.sifat.184",
          "https://www.instagram.com/misifat93/",
        ],
        "knowsAbout": [
          "React",
          "Next.js",
          "TypeScript",
          "Tailwind CSS",
          "Node.js",
          "Express.js",
          "MongoDB",
          "Prisma ORM",
          "SQLite",
          "Video Editing",
        ],
      },
      {
        "@type": "WebSite",
        "@id": "https://majharulislamsifat.com/#website",
        "url": "https://majharulislamsifat.com",
        "name": "Majharul Islam Sifat — Developer & Creator Portfolio",
        "description": "Official personal brand website and developer portfolio of Majharul Islam Sifat.",
        "publisher": {
          "@id": "https://majharulislamsifat.com/#person",
        },
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}

