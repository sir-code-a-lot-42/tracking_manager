// Complete macro-mapped database optimized for Keto Tracking
// Carb values follow the German convention (verwertbare Kohlenhydrate, fiber excluded).
// "cat" drives the category → product picker in calories.html.
const FOOD_DATABASE = [
  // --- Gemüse ---
  { name: "Brokolli",        cat: "Gemüse", kcal: 26,  carbs: 2.7,  protein: 3.0 },
  { name: "Paprika Grün",    cat: "Gemüse", kcal: 20,  carbs: 2.9,  protein: 1.0 },
  { name: "Paprika Gelb",    cat: "Gemüse", kcal: 30,  carbs: 5.3,  protein: 1.0 },
  { name: "Paprika Rot",     cat: "Gemüse", kcal: 37,  carbs: 6.4,  protein: 1.0 },
  { name: "Zucchini",        cat: "Gemüse", kcal: 19,  carbs: 2.1,  protein: 1.6 },
  { name: "Salat",           cat: "Gemüse", kcal: 12,  carbs: 1.1,  protein: 1.2 },
  { name: "Karotten",        cat: "Gemüse", kcal: 26,  carbs: 4.8,  protein: 1.0 },
  { name: "Selleriestangen", cat: "Gemüse", kcal: 17,  carbs: 1.7,  protein: 0.8 },
  { name: "Salatgurke",      cat: "Gemüse", kcal: 12,  carbs: 1.8,  protein: 0.6 },
  { name: "Radieschen",      cat: "Gemüse", kcal: 15,  carbs: 2.0,  protein: 1.0 },
  { name: "Tomaten",         cat: "Gemüse", kcal: 18,  carbs: 2.6,  protein: 1.0 },

  // --- Pilze ---
  { name: "Champignons",     cat: "Pilze",  kcal: 15,  carbs: 0.6,  protein: 2.7 },

  // --- Obst ---
  { name: "Avocado",         cat: "Obst",   kcal: 130, carbs: 0.4,  protein: 1.9 },
  { name: "Apfel",           cat: "Obst",   kcal: 52,  carbs: 14.0, protein: 0.3 },
  { name: "Birne",           cat: "Obst",   kcal: 52,  carbs: 12.4, protein: 0.4 },
  { name: "Banane",          cat: "Obst",   kcal: 95,  carbs: 23.0, protein: 1.2 },
  { name: "Papaya",          cat: "Obst",   kcal: 32,  carbs: 7.1,  protein: 0.5 },
  { name: "Orange",          cat: "Obst",   kcal: 47,  carbs: 8.3,  protein: 1.0 },
  { name: "Mango",           cat: "Obst",   kcal: 60,  carbs: 13.4, protein: 0.6 },
  { name: "Kaki",            cat: "Obst",   kcal: 127, carbs: 34.0, protein: 0.6 },
  { name: "Kiwi",            cat: "Obst",   kcal: 61,  carbs: 15.0, protein: 1.1 },
  { name: "Tangerine",       cat: "Obst",   kcal: 53,  carbs: 13.0, protein: 0.8 },
  { name: "Ananas",          cat: "Obst",   kcal: 59,  carbs: 12.4, protein: 0.5 },

  // --- Beeren ---
  { name: "Heidelbeere",     cat: "Beeren", kcal: 42,  carbs: 7.4,  protein: 0.6 },
  { name: "Erdbeere",        cat: "Beeren", kcal: 32,  carbs: 5.4,  protein: 0.8 },
  { name: "Himbeere",        cat: "Beeren", kcal: 34,  carbs: 4.8,  protein: 1.3 },

  // --- Nüsse & Kerne ---
  { name: "Pinienkerne",     cat: "Nüsse & Kerne", kcal: 600, carbs: 13.0, protein: 14.0 }
];

// Order of the category dropdown; unknown categories are appended.
const FOOD_CATEGORIES = ["Gemüse", "Beeren", "Obst", "Pilze", "Nüsse & Kerne"];
