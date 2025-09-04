import { v4 as uuidv4 } from 'uuid';

const rawItemData = {
  phone: {
    smart: {
      apple: [
        {
          id: uuidv4(),
          title: 'Apple iPhone 11',
          brand: 'apple',
          description: `Apple iPhone 11 - 256GB - Excellent Condition`,
          storage: '1TB',
          colorPreference: [
          { colorCode: 1, displayValue: 'silver' },
          { colorCode: 2, displayValue: 'blue' }
          ]
        },
        {
          id: uuidv4(),
          title: 'Apple iPhone 11',
          brand: 'apple',
          description: `Apple iPhone 11 - 256GB - Fair Condition`,
          storage: '1TB',
          colorPreference: [
          { colorCode: 1, displayValue: 'gold' },
          { colorCode: 2, displayValue: 'silver' }
          ]
        },
        {
          id: uuidv4(),
          title: 'Apple iPhone 13',
          brand: 'apple',
          description: `Apple iPhone 13 - 1TB - Excellent Condition`,
          storage: '128GB',
          colorPreference: [
          { colorCode: 1, displayValue: 'silver' },
          { colorCode: 2, displayValue: 'white' }
          ]
        },
        {
          id: uuidv4(),
          title: 'Apple iPhone 13',
          brand: 'apple',
          description: `Apple iPhone 13 - 128GB - Good Condition`,
          storage: '1TB',
          colorPreference: [
          { colorCode: 1, displayValue: 'green' },
          { colorCode: 2, displayValue: 'silver' }
          ]
        },
        {
          id: uuidv4(),
          title: 'Apple iPhone SE',
          brand: 'apple',
          description: `Apple iPhone SE - 64GB - Excellent Condition`,
          storage: '512GB',
          colorPreference: [
          { colorCode: 1, displayValue: 'blue' },
          { colorCode: 2, displayValue: 'green' }
          ]
        },
        {
          id: uuidv4(),
          title: 'Apple iPhone SE',
          brand: 'apple',
          description: `Apple iPhone SE - 256GB - Fair Condition`,
          storage: '128GB',
          colorPreference: [
          { colorCode: 1, displayValue: 'gold' },
          { colorCode: 2, displayValue: 'green' }
          ]
        },
        {
          id: uuidv4(),
          title: 'Apple iPhone 14 Pro',
          brand: 'apple',
          description: `Apple iPhone 14 Pro - 512GB - Excellent Condition`,
          storage: '64GB',
          colorPreference: [
          { colorCode: 1, displayValue: 'black' },
          { colorCode: 2, displayValue: 'white' }
          ]
        },
        {
          id: uuidv4(),
          title: 'Apple iPhone 14 Pro',
          brand: 'apple',
          description: `Apple iPhone 14 Pro - 64GB - Excellent Condition`,
          storage: '1TB',
          colorPreference: [
          { colorCode: 1, displayValue: 'gold' },
          { colorCode: 2, displayValue: 'black' }
          ]
        },
      ],
      samsung: [
        {
          id: uuidv4(),
          title: 'Samsung Galaxy S21',
          brand: 'samsung',
          description: `Samsung Galaxy S21 - 1TB - Fair Condition`,
          storage: '1TB',
          colorPreference: [
          { colorCode: 1, displayValue: 'silver' },
          { colorCode: 2, displayValue: 'gold' }
          ]
        },
        {
          id: uuidv4(),
          title: 'Samsung Galaxy S21',
          brand: 'samsung',
          description: `Samsung Galaxy S21 - 256GB - Fair Condition`,
          storage: '512GB',
          colorPreference: [
          { colorCode: 1, displayValue: 'black' },
          { colorCode: 2, displayValue: 'green' }
          ]
        },
        {
          id: uuidv4(),
          title: 'Samsung Galaxy Note 20',
          brand: 'samsung',
          description: `Samsung Galaxy Note 20 - 512GB - Good Condition`,
          storage: '64GB',
          colorPreference: [
          { colorCode: 1, displayValue: 'green' },
          { colorCode: 2, displayValue: 'blue' }
          ]
        },
        {
          id: uuidv4(),
          title: 'Samsung Galaxy Note 20',
          brand: 'samsung',
          description: `Samsung Galaxy Note 20 - 1TB - Excellent Condition`,
          storage: '512GB',
          colorPreference: [
          { colorCode: 1, displayValue: 'silver' },
          { colorCode: 2, displayValue: 'green' }
          ]
        },
        {
          id: uuidv4(),
          title: 'Samsung Galaxy A52',
          brand: 'samsung',
          description: `Samsung Galaxy A52 - 128GB - Fair Condition`,
          storage: '64GB',
          colorPreference: [
          { colorCode: 1, displayValue: 'red' },
          { colorCode: 2, displayValue: 'blue' }
          ]
        },
        {
          id: uuidv4(),
          title: 'Samsung Galaxy A52',
          brand: 'samsung',
          description: `Samsung Galaxy A52 - 64GB - Fair Condition`,
          storage: '1TB',
          colorPreference: [
          { colorCode: 1, displayValue: 'white' },
          { colorCode: 2, displayValue: 'red' }
          ]
        },
      ],
      google: [
        {
          id: uuidv4(),
          title: 'Google Pixel 5',
          brand: 'google',
          description: `Google Pixel 5 - 512GB - Excellent Condition`,
          storage: '1TB',
          colorPreference: [
          { colorCode: 1, displayValue: 'gold' },
          { colorCode: 2, displayValue: 'white' }
          ]
        },
        {
          id: uuidv4(),
          title: 'Google Pixel 5',
          brand: 'google',
          description: `Google Pixel 5 - 512GB - Excellent Condition`,
          storage: '1TB',
          colorPreference: [
          { colorCode: 1, displayValue: 'black' },
          { colorCode: 2, displayValue: 'blue' }
          ]
        },
        {
          id: uuidv4(),
          title: 'Google Pixel 6a',
          brand: 'google',
          description: `Google Pixel 6a - 1TB - Excellent Condition`,
          storage: '1TB',
          colorPreference: [
          { colorCode: 1, displayValue: 'gold' },
          { colorCode: 2, displayValue: 'black' }
          ]
        },
        {
          id: uuidv4(),
          title: 'Google Pixel 6a',
          brand: 'google',
          description: `Google Pixel 6a - 512GB - Fair Condition`,
          storage: '128GB',
          colorPreference: [
          { colorCode: 1, displayValue: 'black' },
          { colorCode: 2, displayValue: 'green' }
          ]
        },
        {
          id: uuidv4(),
          title: 'Google Pixel 7 Pro',
          brand: 'google',
          description: `Google Pixel 7 Pro - 1TB - Fair Condition`,
          storage: '128GB',
          colorPreference: [
          { colorCode: 1, displayValue: 'silver' },
          { colorCode: 2, displayValue: 'blue' }
          ]
        },
        {
          id: uuidv4(),
          title: 'Google Pixel 7 Pro',
          brand: 'google',
          description: `Google Pixel 7 Pro - 256GB - Good Condition`,
          storage: '64GB',
          colorPreference: [
          { colorCode: 1, displayValue: 'black' },
          { colorCode: 2, displayValue: 'blue' }
          ]
        },
      ],
    },
    feature: {
      nokia: [
        {
          id: uuidv4(),
          title: 'Nokia Nokia 3310',
          brand: 'nokia',
          description: `Nokia Nokia 3310 - 1TB - Good Condition`,
          storage: '128GB',
          colorPreference: [
          { colorCode: 1, displayValue: 'black' },
          { colorCode: 2, displayValue: 'blue' }
          ]
        },
        {
          id: uuidv4(),
          title: 'Nokia Nokia 3310',
          brand: 'nokia',
          description: `Nokia Nokia 3310 - 512GB - Excellent Condition`,
          storage: '128GB',
          colorPreference: [
          { colorCode: 1, displayValue: 'red' },
          { colorCode: 2, displayValue: 'white' }
          ]
        },
        {
          id: uuidv4(),
          title: 'Nokia Nokia 2720 Flip',
          brand: 'nokia',
          description: `Nokia Nokia 2720 Flip - 512GB - Fair Condition`,
          storage: '128GB',
          colorPreference: [
          { colorCode: 1, displayValue: 'green' },
          { colorCode: 2, displayValue: 'silver' }
          ]
        },
        {
          id: uuidv4(),
          title: 'Nokia Nokia 2720 Flip',
          brand: 'nokia',
          description: `Nokia Nokia 2720 Flip - 128GB - Excellent Condition`,
          storage: '64GB',
          colorPreference: [
          { colorCode: 1, displayValue: 'blue' },
          { colorCode: 2, displayValue: 'gold' }
          ]
        },
      ],
      alcatel: [
        {
          id: uuidv4(),
          title: 'Alcatel Go Flip 3',
          brand: 'alcatel',
          description: `Alcatel Go Flip 3 - 256GB - Good Condition`,
          storage: '512GB',
          colorPreference: [
          { colorCode: 1, displayValue: 'silver' },
          { colorCode: 2, displayValue: 'red' }
          ]
        },
        {
          id: uuidv4(),
          title: 'Alcatel Go Flip 3',
          brand: 'alcatel',
          description: `Alcatel Go Flip 3 - 128GB - Fair Condition`,
          storage: '1TB',
          colorPreference: [
          { colorCode: 1, displayValue: 'silver' },
          { colorCode: 2, displayValue: 'red' }
          ]
        },
        {
          id: uuidv4(),
          title: 'Alcatel Go Flip 4',
          brand: 'alcatel',
          description: `Alcatel Go Flip 4 - 1TB - Fair Condition`,
          storage: '256GB',
          colorPreference: [
          { colorCode: 1, displayValue: 'white' },
          { colorCode: 2, displayValue: 'green' }
          ]
        },
        {
          id: uuidv4(),
          title: 'Alcatel Go Flip 4',
          brand: 'alcatel',
          description: `Alcatel Go Flip 4 - 256GB - Good Condition`,
          storage: '256GB',
          colorPreference: [
          { colorCode: 1, displayValue: 'white' },
          { colorCode: 2, displayValue: 'gold' }
          ]
        },
      ],
    },
  },
  computer: {
    laptop: {
      dell: [
        {
          id: uuidv4(),
          title: 'Dell XPS 13',
          brand: 'dell',
          description: `Dell XPS 13 - 128GB - Fair Condition`,
          storage: '64GB',
          colorPreference: [
          { colorCode: 1, displayValue: 'silver' },
          { colorCode: 2, displayValue: 'blue' }
          ]
        },
        {
          id: uuidv4(),
          title: 'Dell XPS 13',
          brand: 'dell',
          description: `Dell XPS 13 - 256GB - Fair Condition`,
          storage: '64GB',
          colorPreference: [
          { colorCode: 1, displayValue: 'gold' },
          { colorCode: 2, displayValue: 'white' }
          ]
        },
        {
          id: uuidv4(),
          title: 'Dell Inspiron 15',
          brand: 'dell',
          description: `Dell Inspiron 15 - 256GB - Excellent Condition`,
          storage: '128GB',
          colorPreference: [
          { colorCode: 1, displayValue: 'white' },
          { colorCode: 2, displayValue: 'silver' }
          ]
        },
        {
          id: uuidv4(),
          title: 'Dell Inspiron 15',
          brand: 'dell',
          description: `Dell Inspiron 15 - 128GB - Good Condition`,
          storage: '128GB',
          colorPreference: [
          { colorCode: 1, displayValue: 'blue' },
          { colorCode: 2, displayValue: 'green' }
          ]
        },
        {
          id: uuidv4(),
          title: 'Dell Latitude 7420',
          brand: 'dell',
          description: `Dell Latitude 7420 - 256GB - Excellent Condition`,
          storage: '1TB',
          colorPreference: [
          { colorCode: 1, displayValue: 'white' },
          { colorCode: 2, displayValue: 'red' }
          ]
        },
        {
          id: uuidv4(),
          title: 'Dell Latitude 7420',
          brand: 'dell',
          description: `Dell Latitude 7420 - 1TB - Fair Condition`,
          storage: '128GB',
          colorPreference: [
          { colorCode: 1, displayValue: 'gold' },
          { colorCode: 2, displayValue: 'red' }
          ]
        },
      ],
      hp: [
        {
          id: uuidv4(),
          title: 'Hp Spectre x360',
          brand: 'hp',
          description: `Hp Spectre x360 - 256GB - Fair Condition`,
          storage: '1TB',
          colorPreference: [
          { colorCode: 1, displayValue: 'red' },
          { colorCode: 2, displayValue: 'blue' }
          ]
        },
        {
          id: uuidv4(),
          title: 'Hp Spectre x360',
          brand: 'hp',
          description: `Hp Spectre x360 - 256GB - Fair Condition`,
          storage: '128GB',
          colorPreference: [
          { colorCode: 1, displayValue: 'white' },
          { colorCode: 2, displayValue: 'blue' }
          ]
        },
        {
          id: uuidv4(),
          title: 'Hp Pavilion 14',
          brand: 'hp',
          description: `Hp Pavilion 14 - 128GB - Fair Condition`,
          storage: '512GB',
          colorPreference: [
          { colorCode: 1, displayValue: 'white' },
          { colorCode: 2, displayValue: 'red' }
          ]
        },
        {
          id: uuidv4(),
          title: 'Hp Pavilion 14',
          brand: 'hp',
          description: `Hp Pavilion 14 - 1TB - Good Condition`,
          storage: '256GB',
          colorPreference: [
          { colorCode: 1, displayValue: 'black' },
          { colorCode: 2, displayValue: 'gold' }
          ]
        },
        {
          id: uuidv4(),
          title: 'Hp EliteBook 840',
          brand: 'hp',
          description: `Hp EliteBook 840 - 1TB - Good Condition`,
          storage: '128GB',
          colorPreference: [
          { colorCode: 1, displayValue: 'gold' },
          { colorCode: 2, displayValue: 'blue' }
          ]
        },
        {
          id: uuidv4(),
          title: 'Hp EliteBook 840',
          brand: 'hp',
          description: `Hp EliteBook 840 - 128GB - Good Condition`,
          storage: '1TB',
          colorPreference: [
          { colorCode: 1, displayValue: 'gold' },
          { colorCode: 2, displayValue: 'silver' }
          ]
        },
      ],
      apple: [
        {
          id: uuidv4(),
          title: 'Apple MacBook Air M1',
          brand: 'apple',
          description: `Apple MacBook Air M1 - 1TB - Excellent Condition`,
          storage: '256GB',
          colorPreference: [
          { colorCode: 1, displayValue: 'white' },
          { colorCode: 2, displayValue: 'green' }
          ]
        },
        {
          id: uuidv4(),
          title: 'Apple MacBook Air M1',
          brand: 'apple',
          description: `Apple MacBook Air M1 - 64GB - Good Condition`,
          storage: '512GB',
          colorPreference: [
          { colorCode: 1, displayValue: 'gold' },
          { colorCode: 2, displayValue: 'silver' }
          ]
        },
        {
          id: uuidv4(),
          title: 'Apple MacBook Pro M2',
          brand: 'apple',
          description: `Apple MacBook Pro M2 - 256GB - Fair Condition`,
          storage: '128GB',
          colorPreference: [
          { colorCode: 1, displayValue: 'silver' },
          { colorCode: 2, displayValue: 'green' }
          ]
        },
        {
          id: uuidv4(),
          title: 'Apple MacBook Pro M2',
          brand: 'apple',
          description: `Apple MacBook Pro M2 - 64GB - Excellent Condition`,
          storage: '256GB',
          colorPreference: [
          { colorCode: 1, displayValue: 'white' },
          { colorCode: 2, displayValue: 'red' }
          ]
        },
      ],
    },
    desktop: {
      lenovo: [
        {
          id: uuidv4(),
          title: 'Lenovo ThinkCentre M720',
          brand: 'lenovo',
          description: `Lenovo ThinkCentre M720 - 256GB - Excellent Condition`,
          storage: '128GB',
          colorPreference: [
          { colorCode: 1, displayValue: 'gold' },
          { colorCode: 2, displayValue: 'red' }
          ]
        },
        {
          id: uuidv4(),
          title: 'Lenovo ThinkCentre M720',
          brand: 'lenovo',
          description: `Lenovo ThinkCentre M720 - 256GB - Good Condition`,
          storage: '128GB',
          colorPreference: [
          { colorCode: 1, displayValue: 'green' },
          { colorCode: 2, displayValue: 'gold' }
          ]
        },
        {
          id: uuidv4(),
          title: 'Lenovo IdeaCentre AIO 3',
          brand: 'lenovo',
          description: `Lenovo IdeaCentre AIO 3 - 1TB - Fair Condition`,
          storage: '256GB',
          colorPreference: [
          { colorCode: 1, displayValue: 'green' },
          { colorCode: 2, displayValue: 'white' }
          ]
        },
        {
          id: uuidv4(),
          title: 'Lenovo IdeaCentre AIO 3',
          brand: 'lenovo',
          description: `Lenovo IdeaCentre AIO 3 - 512GB - Fair Condition`,
          storage: '64GB',
          colorPreference: [
          { colorCode: 1, displayValue: 'blue' },
          { colorCode: 2, displayValue: 'gold' }
          ]
        },
      ],
      asus: [
        {
          id: uuidv4(),
          title: 'Asus ROG Strix',
          brand: 'asus',
          description: `Asus ROG Strix - 64GB - Excellent Condition`,
          storage: '256GB',
          colorPreference: [
          { colorCode: 1, displayValue: 'gold' },
          { colorCode: 2, displayValue: 'blue' }
          ]
        },
        {
          id: uuidv4(),
          title: 'Asus ROG Strix',
          brand: 'asus',
          description: `Asus ROG Strix - 64GB - Good Condition`,
          storage: '512GB',
          colorPreference: [
          { colorCode: 1, displayValue: 'white' },
          { colorCode: 2, displayValue: 'gold' }
          ]
        },
        {
          id: uuidv4(),
          title: 'Asus VivoPC',
          brand: 'asus',
          description: `Asus VivoPC - 128GB - Excellent Condition`,
          storage: '64GB',
          colorPreference: [
          { colorCode: 1, displayValue: 'green' },
          { colorCode: 2, displayValue: 'black' }
          ]
        },
        {
          id: uuidv4(),
          title: 'Asus VivoPC',
          brand: 'asus',
          description: `Asus VivoPC - 512GB - Fair Condition`,
          storage: '512GB',
          colorPreference: [
          { colorCode: 1, displayValue: 'black' },
          { colorCode: 2, displayValue: 'blue' }
          ]
        },
      ],
    },
  },
};

export default rawItemData;