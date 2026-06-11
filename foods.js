// Complete macro-mapped database optimized for Keto Tracking
// Carb values follow the German food-table convention (available carbohydrates, fiber excluded).
// "cat" drives the category → product picker in calories.html.
const FOOD_DATABASE = [
  // --- Vegetables ---
  { name: "Broccoli",           cat: "Vegetables", kcal: 26,  carbs: 2.7,  protein: 3.0 },
  { name: "Bell Pepper Green",  cat: "Vegetables", kcal: 20,  carbs: 2.9,  protein: 1.0 },
  { name: "Bell Pepper Yellow", cat: "Vegetables", kcal: 30,  carbs: 5.3,  protein: 1.0 },
  { name: "Bell Pepper Red",    cat: "Vegetables", kcal: 37,  carbs: 6.4,  protein: 1.0 },
  { name: "Zucchini",           cat: "Vegetables", kcal: 19,  carbs: 2.1,  protein: 1.6 },
  { name: "Lettuce",            cat: "Vegetables", kcal: 12,  carbs: 1.1,  protein: 1.2 },
  { name: "Carrots",            cat: "Vegetables", kcal: 26,  carbs: 4.8,  protein: 1.0 },
  { name: "Celery Sticks",      cat: "Vegetables", kcal: 17,  carbs: 1.7,  protein: 0.8 },
  { name: "Cucumber",           cat: "Vegetables", kcal: 12,  carbs: 1.8,  protein: 0.6 },
  { name: "Radishes",           cat: "Vegetables", kcal: 15,  carbs: 2.0,  protein: 1.0 },
  { name: "Tomatoes",           cat: "Vegetables", kcal: 18,  carbs: 2.6,  protein: 1.0 },

  // --- Mushrooms ---
  { name: "Mushrooms (white)",  cat: "Mushrooms",  kcal: 15,  carbs: 0.6,  protein: 2.7 },

  // --- Fruit ---
  { name: "Avocado",            cat: "Fruit",      kcal: 130, carbs: 0.4,  protein: 1.9 },
  { name: "Apple",              cat: "Fruit",      kcal: 52,  carbs: 14.0, protein: 0.3 },
  { name: "Pear",               cat: "Fruit",      kcal: 52,  carbs: 12.4, protein: 0.4 },
  { name: "Banana",             cat: "Fruit",      kcal: 95,  carbs: 23.0, protein: 1.2 },
  { name: "Papaya",             cat: "Fruit",      kcal: 32,  carbs: 7.1,  protein: 0.5 },
  { name: "Orange",             cat: "Fruit",      kcal: 47,  carbs: 8.3,  protein: 1.0 },
  { name: "Mango",              cat: "Fruit",      kcal: 60,  carbs: 13.4, protein: 0.6 },
  { name: "Persimmon",          cat: "Fruit",      kcal: 127, carbs: 34.0, protein: 0.6 },
  { name: "Kiwi",               cat: "Fruit",      kcal: 61,  carbs: 15.0, protein: 1.1 },
  { name: "Tangerine",          cat: "Fruit",      kcal: 53,  carbs: 13.0, protein: 0.8 },
  { name: "Pineapple",          cat: "Fruit",      kcal: 59,  carbs: 12.4, protein: 0.5 },

  // --- Berries ---
  { name: "Blueberries",        cat: "Berries",    kcal: 42,  carbs: 7.4,  protein: 0.6 },
  { name: "Strawberries",       cat: "Berries",    kcal: 32,  carbs: 5.4,  protein: 0.8 },
  { name: "Raspberries",        cat: "Berries",    kcal: 34,  carbs: 4.8,  protein: 1.3 },

  // --- Nuts & Seeds ---
  { name: "Pine Nuts",          cat: "Nuts & Seeds", kcal: 600, carbs: 13.0, protein: 14.0 }
];

// Order of the category dropdown; unknown categories are appended.
const FOOD_CATEGORIES = ["Vegetables", "Berries", "Fruit", "Mushrooms", "Nuts & Seeds"];
