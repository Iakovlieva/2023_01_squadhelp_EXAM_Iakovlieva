const env = process.env.NODE_ENV || 'development';
const serverIP = 'localhost';
const serverPort = 3000;
const CONSTANTS = {
  CUSTOMER: 'customer',
  CREATOR: 'creator',
  MODERATOR: 'moderator',
  CONTEST_STATUS_ACTIVE: 'active',
  CONTEST_STATUS_FINISHED: 'finished',
  CONTEST_STATUS_PENDING: 'pending',
  NAME_CONTEST: 'name',
  LOGO_CONTEST: 'logo',
  TAGLINE_CONTEST: 'tagline',
  OFFER_STATUS_REJECTED: 'rejected',
  OFFER_STATUS_ALLOWED: 'allowed',  
  OFFER_STATUS_FORBIDDEN: 'forbidden',  
  OFFER_STATUS_WON: 'won',
  OFFER_STATUS_PENDING: 'pending',
  STATIC_IMAGES_PATH: '/staticImages/',
  ANONYM_IMAGE_PATH: '/staticImages/anonym.png',
  BASE_URL: `http://${serverIP}:${serverPort}/`,
  ACCESS_TOKEN: 'accessToken',
  publicURL: env === 'production'
    ? `http://${serverIP}:80/images/`
    : `http://${serverIP}:${serverPort}/public/images/`,
  NORMAL_PREVIEW_CHAT_MODE: 'NORMAL_PREVIEW_CHAT_MODE',
  FAVORITE_PREVIEW_CHAT_MODE: 'FAVORITE_PREVIEW_CHAT_MODE',
  BLOCKED_PREVIEW_CHAT_MODE: 'BLOCKED_PREVIEW_CHAT_MODE',
  CATALOG_PREVIEW_CHAT_MODE: 'CATALOG_PREVIEW_CHAT_MODE',
  CHANGE_BLOCK_STATUS: 'CHANGE_BLOCK_STATUS',
  ADD_CHAT_TO_OLD_CATALOG: 'ADD_CHAT_TO_OLD_CATALOG',
  CREATE_NEW_CATALOG_AND_ADD_CHAT: 'CREATE_NEW_CATALOG_AND_ADD_CHAT',
  USER_INFO_MODE: 'USER_INFO_MODE',
  CASHOUT_MODE: 'CASHOUT_MODE',
  HEADER_ANIMATION_TEXT: [
    'a Company',
    'a Brand',
    'a Website',
    'a Service',
    'a Book',
    'a Business',
    'an App',
    'a Product',
    'a Startup',
  ],
  FooterItems: [
    {
      title: 'SQUADHELP',
      items: [
        'About',
        'Contact',
        'How It Works?',
        'Testimonials',
        'Our Work',
      ],
    },
    {
      title: 'RESOURCES',
      items: [
        'How It Works',
        'Become a Creative',
        'Business Name Generator',
        'Discussion Forum',
        'Blog',
        'Download eBook',
        'Pricing',
        'Help & FAQs',
      ],
    },
    {
      title: 'OUR SERVICES',
      items: [
        'Naming',
        'Logo Design',
        'Taglines',
        'Premium Names For Sale',
        'Creative Owned Names For Sale',
        'Audience Testing',
        'Trademark Research & Filling',
        'Managed Agency Service',
      ],
    },
    {
      title: 'LEGAL',
      items: [
        'Terms of Service',
        'Privacy Policy',
        'Cookie Policy',
      ],
    },
  ],
  ACCORDEONITEMS: {
    LAUNCHING_A_CONTEST: [
        {
            question: 'How long does it take to start receiving submissions?',
            answer: 'For Naming contests, you will start receiving your submissions within few minutes of launching your contest. Since our creatives are located across the globe, you can expect to receive submissions 24 X 7 throughout the duration of the brainstorming phase .'
        },
        {
            question: 'How long do Naming Contests last?',
            answer: 'You can choose a duration from 1 day to 7 days. We recommend a duration of 3 Days or 5 Days. This allows for sufficient time for entry submission as well as brainstorming with creatives. If you take advantage of our validation services such as Audience Testing and Trademark Research, both will be an additional 4-7 days (3-5 business days for Audience Testing and 1-2 business days for Trademark Research).'
        },
        {
            question: 'Where are the creatives located?',
            answer: 'About 70% of our Creatives are located in the United States and other English speaking countries (i.e. United Kingdom, Canada, and Australia.). We utilize an advanced rating score algorithm to ensure that high quality creatives receive more opportunities to participate in our contests.'
        },
        {
            question: 'What if I do not like any submissions?',
            answer: `While it is unusually rare that you will not like any names provided, we have a few options in case this problem occurs:
            <ul>
              <li> If the contest ends and you have not yet found a name that you’d like to move forward with, we can provide complimentary extension of your contest as well as a complimentary consultation with one of our branding consultants (a $99 value). </li>

              <li> By exploring our premium domain marketplace you can apply the contest award towards the purchase of any name listed for sale. </li>
              <li>If you choose the Gold package or Platinum package and keep the contest as "Not Guaranteed", you can request a partial refund if you choose not to move forward with any name from you project. (Please note that the refund is for the contest award). Here is a link to our <a href="https://helpdesk.squadhelp.com/en/articles/115621-refund-policy" target="_blank">Refund Policy</a></li>
            </ul>`
        },
        {
            question: 'How much does it cost?',
            answer: 'About 70% of our Creatives are located in the United States and other English speaking countries (i.e. United Kingdom, Canada, and Australia.). We utilize an advanced rating score algorithm to ensure that high quality creatives receive more opportunities to participate in our contests.'
        },
        {
            question: 'I need both a Name and a Logo. Do you offer any discount for multiple contests?',
            answer: 'About 70% of our Creatives are located in the United States and other English speaking countries (i.e. United Kingdom, Canada, and Australia.). We utilize an advanced rating score algorithm to ensure that high quality creatives receive more opportunities to participate in our contests.'
        },
        {
            question: 'What if I want to keep my business idea private?',
            answer: 'About 70% of our Creatives are located in the United States and other English speaking countries (i.e. United Kingdom, Canada, and Australia.). We utilize an advanced rating score algorithm to ensure that high quality creatives receive more opportunities to participate in our contests.'
        },
        {
            question: 'Can you serve customers outside the US?',
            answer: 'About 70% of our Creatives are located in the United States and other English speaking countries (i.e. United Kingdom, Canada, and Australia.). We utilize an advanced rating score algorithm to ensure that high quality creatives receive more opportunities to participate in our contests.'
        },
        {
            question: 'Can I see any examples?',
            answer: 'Our creatives have submitted more than 6 Million names and thousands of logos on our platform. Here are some examples of Names, Taglines, and Logos that were submitted in recent contests. Name Examples Tagline Example Logo Examples'
        }

    ],
    BUYING_FROM_MARKETPLACE: [
        {
            question: "What's included with a Domain Purchase?",
            answer: 'When you purchase a domain from our premium domain marketplace, you will receive the exact match .com URL, a complimentary logo design (along with all source files), as well as a complimentary Trademark report and Audience Testing if you’re interested in validating your name.'
        },
        {
            question: 'How does the Domain transfer process work?',
            answer: 'Once you purchase a Domain, our transfer specialists will reach out to you (typically on the same business day). In most cases we can transfer the domain to your preferred registrar (such as GoDaddy). Once we confirm the transfer details with you, the transfers are typically initiated to your account within 1 business day.'
        },
        {
            question: 'If I purchase a Domain on installments, can I start using it to setup my website?',
            answer: 'We offer payment plans for many domains in our Marketplace. If you purchase a domain on a payment plan, we hold the domain in an Escrow account until it is fully paid off. However our team can assist you with making any changes to the domains (such as Nameserver changes), so that you can start using the domain right away after making your first installment payment.'
        }

    ]
  }
};

export default CONSTANTS;