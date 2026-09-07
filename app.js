/**
 * កងវិលចាប់ឈ្មោះសិស្សបែបខ្មែរ (Khmer Lucky Student Wheel)
 * JavaScript Core Logic, Physics, Canvas Engine, Web Audio Synthesizer, Confetti System & Excel Integration
 */

(function () {
  'use strict';

  // --- Initial Default Student Names (Empty by default) ---
  const DEFAULT_STUDENTS = [];

  // ==========================================================================
  // System Themes Registry (រូបរាងប្រព័ន្ធ ៣៥ Styles)
  // ==========================================================================
  const THEMES = [
    // 1. Khmer Heritage & Royal (វប្បធម៌ខ្មែរ)
    {
      id: 'khmer-royal',
      nameKm: 'រាជវាំងខ្មែរ',
      nameEn: 'Khmer Royal Gold',
      category: 'khmer',
      categoryKm: 'វប្បធម៌ខ្មែរ',
      icon: '👑',
      swatch: ['#180206', '#ffd74d', '#b80d2d', '#f5c018'],
      slicePalette: ['#9e1127', '#134e4a', '#1e3a8a', '#b45309', '#6b21a8', '#991b1b', '#065f46', '#831843', '#312e81', '#c2410c'],
      rimColor: '#d49b00',
      dividerColor: '#ffd74d',
      accentColor: '#ffd74d'
    },
    {
      id: 'angkor-sunset',
      nameKm: 'ថ្ងៃលិចអង្គរវត្ត',
      nameEn: 'Angkor Sunset',
      category: 'khmer',
      categoryKm: 'វប្បធម៌ខ្មែរ',
      icon: '🌅',
      swatch: ['#1c0a03', '#f97316', '#ffaa33', '#c2410c'],
      slicePalette: ['#c2410c', '#b45309', '#9a3412', '#d97706', '#7c2d12', '#ea580c', '#854d0e', '#78350f'],
      rimColor: '#d97706',
      dividerColor: '#ffaa33',
      accentColor: '#f97316'
    },
    {
      id: 'emerald-bayon',
      nameKm: 'ត្បូងមរកតបាយ័ន',
      nameEn: 'Emerald Bayon',
      category: 'khmer',
      categoryKm: 'វប្បធម៌ខ្មែរ',
      icon: '🏛️',
      swatch: ['#02160f', '#10b981', '#34d399', '#f59e0b'],
      slicePalette: ['#047857', '#065f46', '#0f766e', '#059669', '#10b981', '#064e3b', '#0d9488', '#115e59'],
      rimColor: '#059669',
      dividerColor: '#34d399',
      accentColor: '#10b981'
    },
    {
      id: 'sapphire-preahvihear',
      nameKm: 'កែវកណ្ដឹងព្រះវិហារ',
      nameEn: 'Sapphire Preah Vihear',
      category: 'khmer',
      categoryKm: 'វប្បធម៌ខ្មែរ',
      icon: '🔔',
      swatch: ['#051024', '#3b82f6', '#60a5fa', '#fbbf24'],
      slicePalette: ['#1d4ed8', '#1e40af', '#1e3a8a', '#2563eb', '#0369a1', '#0f766e', '#312e81', '#172554'],
      rimColor: '#2563eb',
      dividerColor: '#60a5fa',
      accentColor: '#3b82f6'
    },
    {
      id: 'banteay-srei',
      nameKm: 'បន្ទាយស្រីថ្មផ្កាឈូក',
      nameEn: 'Banteay Srei Rose',
      category: 'khmer',
      categoryKm: 'វប្បធម៌ខ្មែរ',
      icon: '🌺',
      swatch: ['#1f0b14', '#ec4899', '#f472b6', '#be185d'],
      slicePalette: ['#be185d', '#9d174d', '#831843', '#db2777', '#ec4899', '#9f1239', '#701a75', '#a21caf'],
      rimColor: '#db2777',
      dividerColor: '#f472b6',
      accentColor: '#ec4899'
    },
    {
      id: 'apsara-celestial',
      nameKm: 'ទេពអប្សរាឋានសួគ៌',
      nameEn: 'Apsara Celestial',
      category: 'khmer',
      categoryKm: 'វប្បធម៌ខ្មែរ',
      icon: '✨',
      swatch: ['#130722', '#a855f7', '#c084fc', '#ffd74d'],
      slicePalette: ['#7e22ce', '#6b21a8', '#581c87', '#9333ea', '#7c3aed', '#6d28d9', '#a855f7', '#86198f'],
      rimColor: '#9333ea',
      dividerColor: '#c084fc',
      accentColor: '#a855f7'
    },

    // 2. Nature & Waterways (ធម្មជាតិ)
    {
      id: 'kulen-waterfall',
      nameKm: 'ទឹកជ្រោះភ្នំគូលែន',
      nameEn: 'Kulen Waterfall',
      category: 'nature',
      categoryKm: 'ធម្មជាតិ',
      icon: '🌊',
      swatch: ['#021517', '#14b8a6', '#2dd4bf', '#38bdf8'],
      slicePalette: ['#0f766e', '#0d9488', '#14b8a6', '#0284c7', '#0369a1', '#047857', '#0891b2', '#0e7490'],
      rimColor: '#0d9488',
      dividerColor: '#2dd4bf',
      accentColor: '#14b8a6'
    },
    {
      id: 'mekong-river',
      nameKm: 'ដងទន្លេមេគង្គ',
      nameEn: 'Mekong River',
      category: 'nature',
      categoryKm: 'ធម្មជាតិ',
      icon: '🏞️',
      swatch: ['#041226', '#0ea5e9', '#38bdf8', '#f59e0b'],
      slicePalette: ['#0369a1', '#0284c7', '#075985', '#0c4a6e', '#1d4ed8', '#1e3a8a', '#0891b2', '#155e75'],
      rimColor: '#0284c7',
      dividerColor: '#38bdf8',
      accentColor: '#0ea5e9'
    },
    {
      id: 'lotus-bloom',
      nameKm: 'ផ្កាឈូកសិរី',
      nameEn: 'Sacred Lotus',
      category: 'nature',
      categoryKm: 'ធម្មជាតិ',
      icon: '🪷',
      swatch: ['#1b0716', '#f43f5e', '#fb7185', '#ffd74d'],
      slicePalette: ['#be123c', '#e11d48', '#9f1239', '#881337', '#b91c1c', '#991b1b', '#c026d3', '#a21caf'],
      rimColor: '#e11d48',
      dividerColor: '#fb7185',
      accentColor: '#f43f5e'
    },
    {
      id: 'cardamom-forest',
      nameKm: 'ជួរភ្នំក្រវាញ',
      nameEn: 'Cardamom Forest',
      category: 'nature',
      categoryKm: 'ធម្មជាតិ',
      icon: '🌲',
      swatch: ['#061509', '#22c55e', '#4ade80', '#ca8a04'],
      slicePalette: ['#15803d', '#16a34a', '#14532d', '#166534', '#047857', '#065f46', '#4d7c0f', '#3f6212'],
      rimColor: '#16a34a',
      dividerColor: '#4ade80',
      accentColor: '#22c55e'
    },
    {
      id: 'koh-rong',
      nameKm: 'កោះរ៉ុងឋានសួគ៌',
      nameEn: 'Koh Rong Paradise',
      category: 'nature',
      categoryKm: 'ធម្មជាតិ',
      icon: '🏝️',
      swatch: ['#02171c', '#06b6d4', '#22d3ee', '#fb923c'],
      slicePalette: ['#0891b2', '#06b6d4', '#0e7490', '#155e75', '#0284c7', '#0369a1', '#0d9488', '#0f766e'],
      rimColor: '#0891b2',
      dividerColor: '#22d3ee',
      accentColor: '#06b6d4'
    },
    {
      id: 'bokor-mist',
      nameKm: 'អ័ព្ទភ្នំបូកគោ',
      nameEn: 'Bokor Mountain Mist',
      category: 'nature',
      categoryKm: 'ធម្មជាតិ',
      icon: '🌫️',
      swatch: ['#0e131b', '#64748b', '#94a3b8', '#38bdf8'],
      slicePalette: ['#334155', '#475569', '#1e293b', '#64748b', '#0f766e', '#1e3a8a', '#3b82f6', '#374151'],
      rimColor: '#475569',
      dividerColor: '#94a3b8',
      accentColor: '#64748b'
    },

    // 3. Gemstones & Harvest (ត្បូង & ភោគផល)
    {
      id: 'ruby-pailin',
      nameKm: 'ត្បូងទទឹមប៉ៃលិន',
      nameEn: 'Pailin Ruby',
      category: 'gems',
      categoryKm: 'ត្បូង & ភោគផល',
      icon: '💎',
      swatch: ['#190104', '#ef4444', '#f87171', '#ffd74d'],
      slicePalette: ['#b91c1c', '#dc2626', '#991b1b', '#7f1d1d', '#881337', '#9f1239', '#c2410c', '#b45309'],
      rimColor: '#dc2626',
      dividerColor: '#f87171',
      accentColor: '#ef4444'
    },
    {
      id: 'royal-amethyst',
      nameKm: 'ត្បូងកណ្តៀងរាត្រី',
      nameEn: 'Royal Amethyst',
      category: 'gems',
      categoryKm: 'ត្បូង & ភោគផល',
      icon: '🔮',
      swatch: ['#150320', '#c084fc', '#d8b4fe', '#f472b6'],
      slicePalette: ['#9333ea', '#7e22ce', '#6b21a8', '#a855f7', '#86198f', '#a21caf', '#7c3aed', '#6d28d9'],
      rimColor: '#a855f7',
      dividerColor: '#d8b4fe',
      accentColor: '#c084fc'
    },
    {
      id: 'golden-harvest',
      nameKm: 'ស្រូវមាសវាលស្រែ',
      nameEn: 'Golden Harvest',
      category: 'gems',
      categoryKm: 'ត្បូង & ភោគផល',
      icon: '🌾',
      swatch: ['#1a1202', '#eab308', '#fde047', '#ea580c'],
      slicePalette: ['#ca8a04', '#a16207', '#b45309', '#d97706', '#c2410c', '#854d0e', '#713f12', '#ea580c'],
      rimColor: '#ca8a04',
      dividerColor: '#fde047',
      accentColor: '#eab308'
    },
    {
      id: 'kampot-pepper',
      nameKm: 'ម្រេចខ្មៅកំពត',
      nameEn: 'Kampot Black Pepper',
      category: 'gems',
      categoryKm: 'ត្បូង & ភោគផល',
      icon: '⚫',
      swatch: ['#0d0d0e', '#c59b27', '#d4af37', '#ef4444'],
      slicePalette: ['#3f3f46', '#27272a', '#52525b', '#71717a', '#78350f', '#713f12', '#991b1b', '#1e3a8a'],
      rimColor: '#997517',
      dividerColor: '#d4af37',
      accentColor: '#c59b27'
    },
    {
      id: 'khmer-mocha',
      nameKm: 'កាហ្វេម៉ូកាខ្មែរ',
      nameEn: 'Khmer Mocha Coffee',
      category: 'gems',
      categoryKm: 'ត្បូង & ភោគផល',
      icon: '☕',
      swatch: ['#160c06', '#fb923c', '#fed7aa', '#ea580c'],
      slicePalette: ['#9a3412', '#7c2d12', '#854d0e', '#713f12', '#b45309', '#c2410c', '#ea580c', '#a16207'],
      rimColor: '#ea580c',
      dividerColor: '#fed7aa',
      accentColor: '#fb923c'
    },

    // 4. Cosmic & Midnight (រាត្រី & លំហ)
    {
      id: 'galaxy-nebula',
      nameKm: 'កាឡាក់ស៊ីលំហអាកាស',
      nameEn: 'Galaxy Nebula',
      category: 'cosmic',
      categoryKm: 'រាត្រី & លំហ',
      icon: '🌌',
      swatch: ['#09041b', '#d946ef', '#e879f9', '#6366f1'],
      slicePalette: ['#a21caf', '#7e22ce', '#6366f1', '#4f46e5', '#86198f', '#9333ea', '#c026d3', '#312e81'],
      rimColor: '#c026d3',
      dividerColor: '#e879f9',
      accentColor: '#d946ef'
    },
    {
      id: 'midnight-gold',
      nameKm: 'រាត្រីមាសស្ងប់ស្ងាត់',
      nameEn: 'Midnight OLED Gold',
      category: 'cosmic',
      categoryKm: 'រាត្រី & លំហ',
      icon: '🌑',
      swatch: ['#040405', '#eab308', '#fde047', '#ca8a04'],
      slicePalette: ['#a16207', '#854d0e', '#713f12', '#ca8a04', '#3f3f46', '#27272a', '#52525b', '#78350f'],
      rimColor: '#ca8a04',
      dividerColor: '#fde047',
      accentColor: '#eab308'
    },
    {
      id: 'ocean-abyss',
      nameKm: 'បាតសមុទ្រជ្រៅ',
      nameEn: 'Ocean Abyss',
      category: 'cosmic',
      categoryKm: 'រាត្រី & លំហ',
      icon: '🦑',
      swatch: ['#020b19', '#0284c7', '#38bdf8', '#06b6d4'],
      slicePalette: ['#075985', '#0369a1', '#0e7490', '#155e75', '#1e40af', '#1e3a8a', '#0891b2', '#0284c7'],
      rimColor: '#0369a1',
      dividerColor: '#38bdf8',
      accentColor: '#0284c7'
    },
    {
      id: 'blood-moon',
      nameKm: 'ចន្ទគ្រាសក្រហម',
      nameEn: 'Blood Moon Eclipse',
      category: 'cosmic',
      categoryKm: 'រាត្រី & លំហ',
      icon: '🌕',
      swatch: ['#140204', '#f43f5e', '#fb7185', '#881337'],
      slicePalette: ['#9f1239', '#881337', '#be123c', '#991b1b', '#7f1d1d', '#4c0519', '#b91c1c', '#e11d48'],
      rimColor: '#e11d48',
      dividerColor: '#fb7185',
      accentColor: '#f43f5e'
    },
    {
      id: 'forest-firefly',
      nameKm: 'ពន្លឺអំពタルព្រៃ',
      nameEn: 'Forest Firefly',
      category: 'cosmic',
      categoryKm: 'រាត្រី & លំហ',
      icon: '✨',
      swatch: ['#051107', '#a3e635', '#bef264', '#22c55e'],
      slicePalette: ['#65a30d', '#4d7c0f', '#3f6212', '#84cc16', '#15803d', '#166534', '#14532d', '#047857'],
      rimColor: '#84cc16',
      dividerColor: '#bef264',
      accentColor: '#a3e635'
    },
    {
      id: 'nordic-aurora',
      nameKm: 'ពន្លឺអូរ៉ូរ៉ាទឹកកក',
      nameEn: 'Nordic Aurora',
      category: 'cosmic',
      categoryKm: 'រាត្រី & លំហ',
      icon: '🌌',
      swatch: ['#031219', '#10b981', '#34d399', '#6366f1'],
      slicePalette: ['#047857', '#0f766e', '#0e7490', '#4f46e5', '#059669', '#0d9488', '#1e40af', '#065f46'],
      rimColor: '#06b6d4',
      dividerColor: '#34d399',
      accentColor: '#10b981'
    },

    // 5. Neon & Cyberpunk (នីអុង & ស៊ីប៊ើ)
    {
      id: 'cyberpunk-neon',
      nameKm: 'ស៊ីប៊ើភ្នំពេញ នីអុង',
      nameEn: 'Cyberpunk Phnom Penh',
      category: 'neon',
      categoryKm: 'នីអុង & ស៊ីប៊ើ',
      icon: '🤖',
      swatch: ['#0d041a', '#22d3ee', '#06b6d4', '#f43f5e'],
      slicePalette: ['#be123c', '#0891b2', '#7e22ce', '#c026d3', '#0e7490', '#db2777', '#4f46e5', '#9f1239'],
      rimColor: '#0891b2',
      dividerColor: '#22d3ee',
      accentColor: '#22d3ee'
    },
    {
      id: 'retro-synthwave',
      nameKm: 'រលកស៊ីនថ្វេវ 80s',
      nameEn: 'Retro Synthwave 80s',
      category: 'neon',
      categoryKm: 'នីអុង & ស៊ីប៊ើ',
      icon: '🕹️',
      swatch: ['#16041a', '#f97316', '#fb923c', '#d946ef'],
      slicePalette: ['#ea580c', '#c026d3', '#c2410c', '#86198f', '#be185d', '#d97706', '#9333ea', '#db2777'],
      rimColor: '#ea580c',
      dividerColor: '#fb923c',
      accentColor: '#f97316'
    },
    {
      id: 'volcanic-magma',
      nameKm: 'បន្ទុះភ្នំភ្លើង',
      nameEn: 'Volcanic Magma',
      category: 'neon',
      categoryKm: 'នីអុង & ស៊ីប៊ើ',
      icon: '🌋',
      swatch: ['#180502', '#ea580c', '#f97316', '#dc2626'],
      slicePalette: ['#dc2626', '#c2410c', '#b91c1c', '#ea580c', '#9a3412', '#7f1d1d', '#d97706', '#b45309'],
      rimColor: '#c2410c',
      dividerColor: '#f97316',
      accentColor: '#ea580c'
    },
    {
      id: 'peacock-majesty',
      nameKm: 'ក្ងោកមាសរុងរឿង',
      nameEn: 'Peacock Majesty',
      category: 'neon',
      categoryKm: 'នីអុង & ស៊ីប៊ើ',
      icon: '🦚',
      swatch: ['#02131e', '#0d9488', '#2dd4bf', '#3b82f6'],
      slicePalette: ['#0f766e', '#1e40af', '#047857', '#0284c7', '#0d9488', '#1d4ed8', '#115e59', '#0369a1'],
      rimColor: '#0f766e',
      dividerColor: '#2dd4bf',
      accentColor: '#0d9488'
    },
    {
      id: 'sunset-horizon',
      nameKm: 'ជើងមេឃអស្តង្គត',
      nameEn: 'Sunset Horizon',
      category: 'neon',
      categoryKm: 'នីអុង & ស៊ីប៊ើ',
      icon: '🌇',
      swatch: ['#1a0717', '#fb7185', '#f472b6', '#a855f7'],
      slicePalette: ['#db2777', '#9333ea', '#ea580c', '#be185d', '#7e22ce', '#c2410c', '#a21caf', '#e11d48'],
      rimColor: '#f97316',
      dividerColor: '#f472b6',
      accentColor: '#fb7185'
    },
    {
      id: 'electric-azure',
      nameKm: 'អគ្គិសនីខៀវ',
      nameEn: 'Electric Azure',
      category: 'neon',
      categoryKm: 'នីអុង & ស៊ីប៊ើ',
      icon: '⚡',
      swatch: ['#040e22', '#00d2ff', '#38bdf8', '#6366f1'],
      slicePalette: ['#0284c7', '#4f46e5', '#0369a1', '#1d4ed8', '#0891b2', '#4338ca', '#075985', '#1e40af'],
      rimColor: '#0284c7',
      dividerColor: '#38bdf8',
      accentColor: '#00d2ff'
    },

    // 6. Soft Pastel & Modern Zen (ស្រទន់ & Zen)
    {
      id: 'sakura-blossom',
      nameKm: 'ផ្កាសាគូរ៉ា',
      nameEn: 'Sakura Blossom',
      category: 'pastel',
      categoryKm: 'ស្រទន់ & Zen',
      icon: '🌸',
      swatch: ['#1d0a14', '#f472b6', '#f9a8d4', '#fb7185'],
      slicePalette: ['#ec4899', '#db2777', '#be185d', '#f43f5e', '#9d174d', '#e11d48', '#831843', '#f472b6'],
      rimColor: '#ec4899',
      dividerColor: '#f9a8d4',
      accentColor: '#f472b6'
    },
    {
      id: 'matcha-zen',
      nameKm: 'តែបៃតងម៉ាត់ឆា',
      nameEn: 'Matcha Zen',
      category: 'pastel',
      categoryKm: 'ស្រទន់ & Zen',
      icon: '🍵',
      swatch: ['#0c1509', '#84cc16', '#bef264', '#eab308'],
      slicePalette: ['#4d7c0f', '#65a30d', '#3f6212', '#15803d', '#166534', '#a16207', '#047857', '#84cc16'],
      rimColor: '#65a30d',
      dividerColor: '#bef264',
      accentColor: '#84cc16'
    },
    {
      id: 'lavender-dream',
      nameKm: 'សុបិនផ្កាឡាវេនឌ័រ',
      nameEn: 'Lavender Dream',
      category: 'pastel',
      categoryKm: 'ស្រទន់ & Zen',
      icon: '🪻',
      swatch: ['#140b21', '#c084fc', '#e9d5ff', '#a855f7'],
      slicePalette: ['#9333ea', '#7e22ce', '#6b21a8', '#a855f7', '#7c3aed', '#6d28d9', '#581c87', '#86198f'],
      rimColor: '#a855f7',
      dividerColor: '#e9d5ff',
      accentColor: '#c084fc'
    },
    {
      id: 'glacier-frost',
      nameKm: 'ផ្ទាំងទឹកកកអាក់ទិក',
      nameEn: 'Glacier Frost',
      category: 'pastel',
      categoryKm: 'ស្រទន់ & Zen',
      icon: '🧊',
      swatch: ['#06141c', '#7dd3fc', '#bae6fd', '#0ea5e9'],
      slicePalette: ['#0369a1', '#0284c7', '#0e7490', '#075985', '#0891b2', '#1d4ed8', '#155e75', '#0c4a6e'],
      rimColor: '#38bdf8',
      dividerColor: '#bae6fd',
      accentColor: '#7dd3fc'
    },
    {
      id: 'desert-dune',
      nameKm: 'ខ្សាច់វាលខ្សាច់មាស',
      nameEn: 'Sahara Desert Dune',
      category: 'pastel',
      categoryKm: 'ស្រទន់ & Zen',
      icon: '🏜️',
      swatch: ['#1a0f06', '#fdba74', '#fed7aa', '#ea580c'],
      slicePalette: ['#c2410c', '#b45309', '#d97706', '#a16207', '#9a3412', '#7c2d12', '#854d0e', '#ea580c'],
      rimColor: '#fb923c',
      dividerColor: '#fed7aa',
      accentColor: '#fdba74'
    },
    {
      id: 'plum-velvet',
      nameKm: 'ផ្លែព្រូនក្សត្រ',
      nameEn: 'Imperial Plum Velvet',
      category: 'pastel',
      categoryKm: 'ស្រទន់ & Zen',
      icon: '🍇',
      swatch: ['#180413', '#e879f9', '#f0abfc', '#d97706'],
      slicePalette: ['#a21caf', '#86198f', '#701a75', '#c026d3', '#9d174d', '#831843', '#9333ea', '#be185d'],
      rimColor: '#c026d3',
      dividerColor: '#f0abfc',
      accentColor: '#e879f9'
    }
  ];

  // Default fallback slice colors
  const SLICE_PALETTES = THEMES[0].slicePalette;

  // Google Apps Script Web App Template (Code.gs)
  // គ្រូអាចចម្លងកូដនេះយកទៅដាក់ក្នុង Google Sheet (Extensions > Apps Script)
  const GOOGLE_APPS_SCRIPT_CODE = `/**
 * Google Apps Script Web App សម្រាប់កងវិលចាប់ឈ្មោះសិស្សខ្មែរ (Khmer Lucky Wheel)
 * មុខងារ៖ រក្សាទុក និងទាញយកទិន្នន័យសិស្ស និងប្រវត្តិអ្នកឈ្នះទៅកាន់ Google Sheets
 * គាំទ្រការភ្ជាប់ទូរស័ព្ទដៃ ថេបប្លេត និងកុំព្យូទ័រគ្រប់ឧបករណ៍
 */

function doGet(e) {
  try {
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var studentSheet = getOrCreateSheet(ss, "Students", ["Name", "Class", "Status", "UpdatedAt"]);
    var historySheet = getOrCreateSheet(ss, "History", ["Round", "Name", "Class", "Timestamp"]);

    // អានទិន្នន័យសិស្ស
    var studentData = [];
    var sLastRow = studentSheet.getLastRow();
    if (sLastRow > 1) {
      var numCols = Math.min(studentSheet.getLastColumn(), 4);
      var sValues = studentSheet.getRange(2, 1, sLastRow - 1, numCols).getValues();
      for (var i = 0; i < sValues.length; i++) {
        var name = String(sValues[i][0] || "").trim();
        var className = String(sValues[i][1] || "").trim();
        var status = numCols >= 3 ? String(sValues[i][2] || "").trim() : "";
        if (name) {
          studentData.push({ name: name, className: className, status: status });
        }
      }
    }

    // អានប្រវត្តិអ្នកឈ្នះ
    var historyData = [];
    var hLastRow = historySheet.getLastRow();
    if (hLastRow > 1) {
      var hValues = historySheet.getRange(2, 1, hLastRow - 1, 4).getValues();
      for (var j = 0; j < hValues.length; j++) {
        var rName = String(hValues[j][1] || "").trim();
        if (rName) {
          historyData.push({
            round: hValues[j][0],
            name: rName,
            className: String(hValues[j][2] || "").trim(),
            timestamp: String(hValues[j][3] || "")
          });
        }
      }
    }

    return ContentService.createTextOutput(JSON.stringify({
      status: "success",
      students: studentData,
      history: historyData,
      count: studentData.length,
      timestamp: new Date().toISOString()
    })).setMimeType(ContentService.MimeType.JSON);

  } catch (err) {
    return ContentService.createTextOutput(JSON.stringify({
      status: "error",
      message: err.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  }
}

function doPost(e) {
  try {
    var payload = {};
    if (e && e.postData && e.postData.contents) {
      payload = JSON.parse(e.postData.contents);
    }

    var action = payload.action || "save";
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var studentSheet = getOrCreateSheet(ss, "Students", ["Name", "Class", "Status", "UpdatedAt"]);
    var historySheet = getOrCreateSheet(ss, "History", ["Round", "Name", "Class", "Timestamp"]);

    if (action === "save" || action === "push") {
      var studentsList = payload.students || [];
      var historyList = payload.history || [];

      // សម្អាតទិន្នន័យចាស់ រួចបញ្ចូលទិន្នន័យថ្មី (រក្សាបញ្ជីសិស្សទាំងអស់)
      studentSheet.clearContents();
      studentSheet.getRange(1, 1, 1, 4).setValues([["Name", "Class", "Status", "UpdatedAt"]]);
      studentSheet.getRange(1, 1, 1, 4).setFontWeight("bold").setBackground("#ffd74d");

      if (studentsList.length > 0) {
        var nowStr = new Date().toLocaleString();
        var sRows = [];
        for (var i = 0; i < studentsList.length; i++) {
          var s = studentsList[i];
          var sName = typeof s === 'string' ? s : (s.name || '');
          var sClass = typeof s === 'string' ? '' : (s.className || '');
          var sStatus = typeof s === 'string' ? 'នៅក្នុងកងវិល' : (s.status || 'នៅក្នុងកងវិល');
          sRows.push([sName, sClass, sStatus, nowStr]);
        }
        studentSheet.getRange(2, 1, sRows.length, 4).setValues(sRows);
      }

      // សម្អាត និងរក្សាទុកប្រវត្តិ
      historySheet.clearContents();
      historySheet.getRange(1, 1, 1, 4).setValues([["Round", "Name", "Class", "Timestamp"]]);
      historySheet.getRange(1, 1, 1, 4).setFontWeight("bold").setBackground("#ffd74d");

      if (historyList.length > 0) {
        var hRows = [];
        for (var j = 0; j < historyList.length; j++) {
          var h = historyList[j];
          hRows.push([h.round || (j + 1), h.name || '', h.className || '', h.timestamp || '']);
        }
        historySheet.getRange(2, 1, hRows.length, 4).setValues(hRows);
      }

      return ContentService.createTextOutput(JSON.stringify({
        status: "success",
        message: "រក្សាទុកទិន្នន័យសិស្ស " + studentsList.length + " នាក់រួចរាល់!",
        count: studentsList.length,
        timestamp: new Date().toISOString()
      })).setMimeType(ContentService.MimeType.JSON);
    }

    return ContentService.createTextOutput(JSON.stringify({
      status: "error",
      message: "Unknown action"
    })).setMimeType(ContentService.MimeType.JSON);

  } catch (err) {
    return ContentService.createTextOutput(JSON.stringify({
      status: "error",
      message: err.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  }
}

function getOrCreateSheet(ss, sheetName, headers) {
  var sheet = ss.getSheetByName(sheetName);
  if (!sheet) {
    sheet = ss.insertSheet(sheetName);
    sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
    sheet.getRange(1, 1, 1, headers.length).setFontWeight("bold").setBackground("#ffd74d");
  }
  return sheet;
}`;

  // --- App State ---
  let students = []; // Active students currently on wheel
  let masterStudents = []; // All registered students (used for reset and re-spinning)
  let winnerHistory = [];
  let currentRotation = 0; // In radians
  let isSpinning = false;
  let spinDuration = 6; // Seconds
  let autoRemove = false;
  let soundEnabled = true;
  let selectedFont = 'Kantumruy Pro';
  let wheelFontScale = 'md';
  let selectedClassFilter = 'all'; // 'all' or specific class name
  let displayViewMode = 'desktop'; // 'desktop', 'mobile', or 'auto'
  let currentRound = 1;
  let lastWinningStudent = null;
  let lastSliceIndex = -1;
  let currentTheme = 'khmer-royal';
  let currentThemeCategoryFilter = 'all';
  let currentThemeSearchTerm = '';

  // Google Sheets Cloud State
  const DEFAULT_GOOGLE_SHEET_URL = 'https://script.google.com/macros/s/AKfycbxh9oWB7OVGVGqb6O8d1Q_g1XCenXyyuEzY-V0ZPCcXWiYRK6_Vq2hdTvRSuQYTXB8_FQ/exec';
  let googleSheetUrl = DEFAULT_GOOGLE_SHEET_URL;
  let lastSheetSyncTime = null;
  let isSheetSyncing = false;

  // Excel parsed temporary state
  let excelRawRows = [];
  let excelHeaders = [];

  // Audio Context (Synthesizer)
  let audioCtx = null;

  // Confetti Engine Variables
  let confettiCanvas = null;
  let confettiCtx = null;
  let confettiParticles = [];
  let confettiAnimationId = null;

  // DOM Elements
  const wheelCanvas = document.getElementById('wheelCanvas');
  const wheelCtx = wheelCanvas.getContext('2d');
  const pointerWrapper = document.getElementById('pointerWrapper');
  const spinBtn = document.getElementById('spinBtn');
  const centerSpinBtn = document.getElementById('centerSpinBtn');
  const shuffleBtn = document.getElementById('shuffleBtn');
  const resetWheelBtn = document.getElementById('resetWheelBtn');
  const wheelFinishedOverlay = document.getElementById('wheelFinishedOverlay');
  const btnFinishedReset = document.getElementById('btnFinishedReset');
  const soundToggleBtn = document.getElementById('soundToggleBtn');
  const soundIcon = document.getElementById('soundIcon');
  const fullscreenBtn = document.getElementById('fullscreenBtn');
  const fullscreenIcon = document.getElementById('fullscreenIcon');

  const fontSelect = document.getElementById('fontSelect');
  const fontSelectSetting = document.getElementById('fontSelectSetting');
  const fontSizeDisplay = document.getElementById('fontSizeDisplay');
  const btnSizes = document.querySelectorAll('.btn-size');

  const btnViewModes = document.querySelectorAll('.btn-view-mode');
  const btnModeSettings = document.querySelectorAll('.btn-mode-setting');
  const viewModeDisplay = document.getElementById('viewModeDisplay');

  const classFilterBar = document.getElementById('classFilterBar');
  const classFilterSelect = document.getElementById('classFilterSelect');

  // Prominent Wheel Class Selector Card above Wheel
  const wheelClassSelectorCard = document.getElementById('wheelClassSelectorCard');
  const activeStudentIndicator = document.getElementById('activeStudentIndicator');
  const classPillsContainer = document.getElementById('classPillsContainer');

  // Mobile Navigation & View Containers
  const wheelSection = document.getElementById('wheelSection');
  const sidePanel = document.getElementById('sidePanel');
  const mobileBottomNav = document.getElementById('mobileBottomNav');
  const mobileNavItems = document.querySelectorAll('.mobile-nav-item');
  const mobileStudentBadge = document.getElementById('mobileStudentBadge');
  const btnJumpWheel = document.getElementById('btnJumpWheel');
  let currentMobileTab = 'wheel';

  const studentList = document.getElementById('studentList');
  const studentCountBadge = document.getElementById('studentCountBadge');
  const historyCountBadge = document.getElementById('historyCountBadge');
  const addStudentForm = document.getElementById('addStudentForm');
  const newStudentInput = document.getElementById('newStudentInput');
  const newStudentClassInput = document.getElementById('newStudentClassInput');
  const btnBulkModal = document.getElementById('btnBulkModal');
  const btnResetRoster = document.getElementById('btnResetRoster');
  const btnClearAll = document.getElementById('btnClearAll');
  const rosterRemovedNotice = document.getElementById('rosterRemovedNotice');
  const removedStudentsCount = document.getElementById('removedStudentsCount');
  const btnRestoreInline = document.getElementById('btnRestoreInline');

  const historyList = document.getElementById('historyList');
  const btnClearHistory = document.getElementById('btnClearHistory');

  const autoRemoveToggle = document.getElementById('autoRemoveToggle');
  const spinDurationRange = document.getElementById('spinDurationRange');
  const durationDisplay = document.getElementById('durationDisplay');
  const soundSettingToggle = document.getElementById('soundSettingToggle');

  // Modals
  const winnerModalOverlay = document.getElementById('winnerModalOverlay');
  const winnerTitleText = document.getElementById('winnerTitleText');
  const winnerNameDisplay = document.getElementById('winnerNameDisplay');
  const winnerClassDisplay = document.getElementById('winnerClassDisplay');
  const winnerMetaText = document.getElementById('winnerMetaText');
  const btnReplayVoice = document.getElementById('btnReplayVoice');
  const btnSpinAgain = document.getElementById('btnSpinAgain');
  const btnKeepWinner = document.getElementById('btnKeepWinner');
  const btnRemoveWinner = document.getElementById('btnRemoveWinner');
  const btnCloseModal = document.getElementById('btnCloseModal');

  // Reset Modal
  const resetModalOverlay = document.getElementById('resetModalOverlay');
  const btnCancelResetModal = document.getElementById('btnCancelResetModal');
  const btnCloseResetModal = document.getElementById('btnCloseResetModal');
  const btnOptRestoreAll = document.getElementById('btnOptRestoreAll');
  const btnOptFreshStart = document.getElementById('btnOptFreshStart');
  const btnOptResetAngle = document.getElementById('btnOptResetAngle');
  const resetRestoreBadge = document.getElementById('resetRestoreBadge');

  // Toast
  const toastNotification = document.getElementById('toastNotification');
  const toastIcon = document.getElementById('toastIcon');
  const toastMessage = document.getElementById('toastMessage');

  const bulkModalOverlay = document.getElementById('bulkModalOverlay');
  const bulkTextarea = document.getElementById('bulkTextarea');
  const btnCancelBulk = document.getElementById('btnCancelBulk');
  const btnCloseBulk = document.getElementById('btnCloseBulk');
  const btnSaveBulk = document.getElementById('btnSaveBulk');

  // Excel Modal Elements
  const btnExcelModal = document.getElementById('btnExcelModal');
  const excelModalOverlay = document.getElementById('excelModalOverlay');
  const btnCancelExcel = document.getElementById('btnCancelExcel');
  const btnCloseExcel = document.getElementById('btnCloseExcel');
  const btnDownloadSampleExcel = document.getElementById('btnDownloadSampleExcel');
  const excelDropzone = document.getElementById('excelDropzone');
  const excelFileInput = document.getElementById('excelFileInput');
  const excelPreviewSection = document.getElementById('excelPreviewSection');
  const excelFileInfo = document.getElementById('excelFileInfo');
  const colNameSelect = document.getElementById('colNameSelect');
  const colClassSelect = document.getElementById('colClassSelect');
  const excelTableHead = document.getElementById('excelTableHead');
  const excelTableBody = document.getElementById('excelTableBody');
  const btnConfirmImportExcel = document.getElementById('btnConfirmImportExcel');

  // Google Sheets Cloud Elements
  const btnGoogleSheetModal = document.getElementById('btnGoogleSheetModal');
  const btnOpenSheetModalFromSetting = document.getElementById('btnOpenSheetModalFromSetting');
  const googleSheetModalOverlay = document.getElementById('googleSheetModalOverlay');
  const btnCancelSheetModal = document.getElementById('btnCancelSheetModal');
  const btnCloseSheetModal = document.getElementById('btnCloseSheetModal');
  const googleSheetUrlInput = document.getElementById('googleSheetUrlInput');
  const btnSaveSheetUrl = document.getElementById('btnSaveSheetUrl');
  const btnPasteAndConnect = document.getElementById('btnPasteAndConnect');
  const btnCopyWebAppUrl = document.getElementById('btnCopyWebAppUrl');
  const btnConnectPresetUrl = document.getElementById('btnConnectPresetUrl');
  const btnCopyPresetUrl = document.getElementById('btnCopyPresetUrl');
  const btnQuickConnectSettings = document.getElementById('btnQuickConnectSettings');
  const btnPushToSheet = document.getElementById('btnPushToSheet');
  const btnPullFromSheet = document.getElementById('btnPullFromSheet');
  const btnCopyShareLink = document.getElementById('btnCopyShareLink');
  const btnToggleScriptGuide = document.getElementById('btnToggleScriptGuide');
  const scriptGuideBox = document.getElementById('scriptGuideBox');
  const btnCopyAppsScriptCode = document.getElementById('btnCopyAppsScriptCode');
  const appsScriptCodePreview = document.getElementById('appsScriptCodePreview');
  const sheetStatusDot = document.getElementById('sheetStatusDot');
  const sheetStatusText = document.getElementById('sheetStatusText');
  const sheetStatusSub = document.getElementById('sheetStatusSub');
  const sheetLastSyncText = document.getElementById('sheetLastSyncText');
  const cloudStatusIndicatorSettings = document.getElementById('cloudStatusIndicatorSettings');
  const cloudSyncBanner = document.getElementById('cloudSyncBanner');
  const syncBannerIcon = document.getElementById('syncBannerIcon');
  const syncBannerText = document.getElementById('syncBannerText');

  // Edit Student Modal Elements
  const editStudentModalOverlay = document.getElementById('editStudentModalOverlay');
  const editStudentOriginalName = document.getElementById('editStudentOriginalName');
  const editStudentOriginalClass = document.getElementById('editStudentOriginalClass');
  const editStudentNameInput = document.getElementById('editStudentNameInput');
  const editStudentClassInput = document.getElementById('editStudentClassInput');
  const btnCancelEditStudent = document.getElementById('btnCancelEditStudent');
  const btnCloseEditStudent = document.getElementById('btnCloseEditStudent');
  const btnSaveEditStudent = document.getElementById('btnSaveEditStudent');

  // System Theme Elements
  const btnOpenThemePickerTop = document.getElementById('btnOpenThemePickerTop');
  const currentThemeBadgeTop = document.getElementById('currentThemeBadgeTop');
  const themePillIcon = document.getElementById('themePillIcon');
  const themeSelectDropdown = document.getElementById('themeSelectDropdown');
  const btnOpenThemeModalFromSettings = document.getElementById('btnOpenThemeModalFromSettings');
  const themeModalOverlay = document.getElementById('themeModalOverlay');
  const btnCloseThemeModal = document.getElementById('btnCloseThemeModal');
  const btnCancelThemeModal = document.getElementById('btnCancelThemeModal');
  const themeActiveHeaderBadge = document.getElementById('themeActiveHeaderBadge');
  const themeSearchInput = document.getElementById('themeSearchInput');
  const btnClearThemeSearch = document.getElementById('btnClearThemeSearch');
  const themeCategoryPills = document.getElementById('themeCategoryPills');
  const themeCardsGrid = document.getElementById('themeCardsGrid');
  const themeFooterCount = document.getElementById('themeFooterCount');

  // --------------------------------------------------------------------------
  // System Theme Management (35 Styles)
  // --------------------------------------------------------------------------
  function getActiveTheme() {
    return THEMES.find((t) => t.id === currentTheme) || THEMES[0];
  }

  function applyTheme(themeId, shouldShowToast = false) {
    const targetTheme = THEMES.find((t) => t.id === themeId);
    if (!targetTheme) return;

    currentTheme = targetTheme.id;
    document.body.setAttribute('data-theme', targetTheme.id);

    // Sync header top pill
    if (currentThemeBadgeTop) currentThemeBadgeTop.textContent = targetTheme.nameKm;
    if (themePillIcon) themePillIcon.textContent = targetTheme.icon;

    // Sync settings dropdown
    if (themeSelectDropdown && themeSelectDropdown.value !== targetTheme.id) {
      themeSelectDropdown.value = targetTheme.id;
    }

    // Sync modal active title
    if (themeActiveHeaderBadge) {
      themeActiveHeaderBadge.textContent = `កំពុងប្រើ៖ ${targetTheme.nameKm}`;
    }

    // Update active state in grid cards
    document.querySelectorAll('.theme-card').forEach((card) => {
      if (card.dataset.themeId === targetTheme.id) {
        card.classList.add('active');
      } else {
        card.classList.remove('active');
      }
    });

    saveToStorage();
    drawWheel();

    if (shouldShowToast && typeof showToast === 'function') {
      showToast(`✨ បានប្ដូររូបរាងទៅជា៖ ${targetTheme.nameKm} (${targetTheme.nameEn})`, targetTheme.icon);
    }
  }

  function populateThemeSettingsDropdown() {
    if (!themeSelectDropdown) return;
    themeSelectDropdown.innerHTML = '';

    const categories = [
      { key: 'khmer', label: '🇰🇭 វប្បធម៌ខ្មែរ (Khmer Heritage)' },
      { key: 'nature', label: '🌿 ធម្មជាតិ & ដែនទឹក (Nature & Water)' },
      { key: 'gems', label: '💎 ត្បូង & ភោគផល (Gems & Harvest)' },
      { key: 'cosmic', label: '🌌 រាត្រី & លំហ (Cosmic & Midnight)' },
      { key: 'neon', label: '⚡ នីអុង & ស៊ីប៊ើ (Neon & Cyberpunk)' },
      { key: 'pastel', label: '🌸 ស្រទន់ & Zen (Pastel & Modern)' }
    ];

    categories.forEach((cat) => {
      const group = document.createElement('optgroup');
      group.label = cat.label;
      THEMES.filter((t) => t.category === cat.key).forEach((t) => {
        const opt = document.createElement('option');
        opt.value = t.id;
        opt.textContent = `${t.icon} ${t.nameKm} (${t.nameEn})`;
        if (t.id === currentTheme) opt.selected = true;
        group.appendChild(opt);
      });
      themeSelectDropdown.appendChild(group);
    });

    themeSelectDropdown.addEventListener('change', (e) => {
      applyTheme(e.target.value, true);
    });
  }

  function renderThemeCards(filterCat = 'all', search = '') {
    if (!themeCardsGrid) return;
    themeCardsGrid.innerHTML = '';

    const normalizedSearch = search.trim().toLowerCase();

    const filtered = THEMES.filter((t) => {
      const matchCat = filterCat === 'all' || t.category === filterCat;
      const matchSearch = !normalizedSearch ||
        t.nameKm.toLowerCase().includes(normalizedSearch) ||
        t.nameEn.toLowerCase().includes(normalizedSearch) ||
        t.categoryKm.toLowerCase().includes(normalizedSearch);
      return matchCat && matchSearch;
    });

    if (themeFooterCount) {
      themeFooterCount.textContent = `បង្ហាញ ${filtered.length} នៃ 35 រូបរាង`;
    }

    if (filtered.length === 0) {
      const emptyNotice = document.createElement('div');
      emptyNotice.style.gridColumn = '1 / -1';
      emptyNotice.style.textAlign = 'center';
      emptyNotice.style.padding = '2.5rem 1rem';
      emptyNotice.style.color = 'var(--text-dim)';
      emptyNotice.textContent = `🔍 មិនមានរូបរាងណាដែលត្រូវនឹងពាក្យស្វែងរក "${search}" ឡើយ`;
      themeCardsGrid.appendChild(emptyNotice);
      return;
    }

    filtered.forEach((t) => {
      const card = document.createElement('div');
      card.className = `theme-card ${t.id === currentTheme ? 'active' : ''}`;
      card.dataset.themeId = t.id;
      card.style.setProperty('--card-accent', t.accentColor || '#ffd74d');

      const topBar = document.createElement('div');
      topBar.className = 'theme-card-bar';
      topBar.style.background = `linear-gradient(90deg, ${t.swatch[0]}, ${t.swatch[1]}, ${t.swatch[2]}, ${t.swatch[3]})`;
      card.appendChild(topBar);

      const header = document.createElement('div');
      header.className = 'theme-card-header';

      const titleGroup = document.createElement('div');
      titleGroup.className = 'theme-card-title-group';

      const iconSpan = document.createElement('span');
      iconSpan.className = 'theme-card-icon';
      iconSpan.textContent = t.icon;

      const namesDiv = document.createElement('div');
      namesDiv.className = 'theme-card-names';

      const nameKm = document.createElement('div');
      nameKm.className = 'theme-card-name-km';
      nameKm.textContent = t.nameKm;

      const nameEn = document.createElement('div');
      nameEn.className = 'theme-card-name-en';
      nameEn.textContent = t.nameEn;

      namesDiv.appendChild(nameKm);
      namesDiv.appendChild(nameEn);
      titleGroup.appendChild(iconSpan);
      titleGroup.appendChild(namesDiv);
      header.appendChild(titleGroup);

      if (t.id === currentTheme) {
        const activeBadge = document.createElement('span');
        activeBadge.className = 'theme-active-badge';
        activeBadge.textContent = '✓ កំពុងប្រើ';
        header.appendChild(activeBadge);
      }

      card.appendChild(header);

      // Swatches row
      const swatchesRow = document.createElement('div');
      swatchesRow.className = 'theme-card-swatches';

      t.swatch.forEach((color) => {
        const dot = document.createElement('span');
        dot.className = 'theme-swatch-dot';
        dot.style.backgroundColor = color;
        dot.title = color;
        swatchesRow.appendChild(dot);
      });

      const catTag = document.createElement('span');
      catTag.className = 'theme-card-category-tag';
      catTag.textContent = t.categoryKm;
      swatchesRow.appendChild(catTag);

      card.appendChild(swatchesRow);

      card.addEventListener('click', () => {
        applyTheme(t.id, true);
        renderThemeCards(currentThemeCategoryFilter, currentThemeSearchTerm);
      });

      themeCardsGrid.appendChild(card);
    });
  }

  function openThemeModal() {
    if (!themeModalOverlay) return;
    if (themeSearchInput) themeSearchInput.value = currentThemeSearchTerm;
    renderThemeCards(currentThemeCategoryFilter, currentThemeSearchTerm);
    themeModalOverlay.classList.add('active');
    if (themeSearchInput) themeSearchInput.focus();
  }

  function closeThemeModal() {
    if (!themeModalOverlay) return;
    themeModalOverlay.classList.remove('active');
  }



  // --------------------------------------------------------------------------
  // Student Normalization & Class Helpers
  // --------------------------------------------------------------------------
  function normalizeStudent(s) {
    if (typeof s === 'string') {
      return { name: s.trim(), className: '' };
    }
    return {
      name: (s.name || '').trim(),
      className: (s.className || '').trim()
    };
  }

  function getActiveStudents() {
    const list = students.map(normalizeStudent);
    if (!selectedClassFilter || selectedClassFilter === 'all') {
      return list;
    }
    return list.filter((s) => s.className === selectedClassFilter);
  }

  function getDistinctClasses() {
    const set = new Set();
    students.forEach((s) => {
      const norm = normalizeStudent(s);
      if (norm.className) {
        set.add(norm.className);
      }
    });
    return Array.from(set).sort();
  }

  function updateClassFilterUI() {
    const classes = getDistinctClasses();
    const allStudents = students.map(normalizeStudent);

    // Populate the prominent class pills container above the wheel
    if (classPillsContainer) {
      classPillsContainer.innerHTML = '';

      // "All classes" pill
      const allPill = document.createElement('button');
      allPill.type = 'button';
      allPill.className = `class-pill ${selectedClassFilter === 'all' ? 'active' : ''}`;
      allPill.setAttribute('data-class', 'all');
      allPill.innerHTML = `
        <span>🌟 គ្រប់ថ្នាក់ទាំងអស់</span>
        <span class="class-pill-badge">${allStudents.length}</span>
      `;
      allPill.addEventListener('click', () => {
        setClassFilter('all');
      });
      classPillsContainer.appendChild(allPill);

      // Each distinct class pill
      classes.forEach((c) => {
        const countInClass = allStudents.filter((s) => s.className === c).length;
        const pill = document.createElement('button');
        pill.type = 'button';
        pill.className = `class-pill ${selectedClassFilter === c ? 'active' : ''}`;
        pill.setAttribute('data-class', c);
        pill.innerHTML = `
          <span>🏫 ថ្នាក់ ${c}</span>
          <span class="class-pill-badge">${countInClass}</span>
        `;
        pill.addEventListener('click', () => {
          setClassFilter(c);
        });
        classPillsContainer.appendChild(pill);
      });
    }

    // Update active count indicator
    const currentActiveStudents = getActiveStudents();
    if (activeStudentIndicator) {
      if (selectedClassFilter === 'all') {
        activeStudentIndicator.textContent = `សរុប ${currentActiveStudents.length} នាក់`;
      } else {
        activeStudentIndicator.textContent = `ថ្នាក់ ${selectedClassFilter} (${currentActiveStudents.length} នាក់)`;
      }
    }

    // Also sync the dropdown in roster tab
    if (classes.length > 0) {
      classFilterBar.style.display = 'flex';
      classFilterSelect.innerHTML = '<option value="all">ទាំងអស់ (គ្រប់ថ្នាក់)</option>';

      classes.forEach((c) => {
        const opt = document.createElement('option');
        opt.value = c;
        opt.textContent = `ថ្នាក់ ${c}`;
        classFilterSelect.appendChild(opt);
      });

      if (classes.includes(selectedClassFilter) || selectedClassFilter === 'all') {
        classFilterSelect.value = selectedClassFilter;
      } else {
        selectedClassFilter = 'all';
        classFilterSelect.value = 'all';
      }
    } else {
      classFilterBar.style.display = 'none';
      selectedClassFilter = 'all';
    }
  }

  function setClassFilter(classVal) {
    selectedClassFilter = classVal;
    saveToStorage();
    updateClassFilterUI();
    renderStudentList();
  }

  // --------------------------------------------------------------------------
  // Storage & Initialization
  // --------------------------------------------------------------------------
  function syncMasterStudentsWithHistory() {
    const map = new Map();
    // 1. Add current students
    students.forEach((s) => {
      const norm = normalizeStudent(s);
      if (norm.name) {
        const key = `${norm.name}:::${norm.className}`;
        map.set(key, norm);
      }
    });
    // 2. Add existing masterStudents
    masterStudents.forEach((s) => {
      const norm = normalizeStudent(s);
      if (norm.name) {
        const key = `${norm.name}:::${norm.className}`;
        if (!map.has(key)) map.set(key, norm);
      }
    });
    // 3. Add any winners from winnerHistory that might have been removed
    winnerHistory.forEach((h) => {
      if (h && h.name) {
        const key = `${h.name.trim()}:::${(h.className || '').trim()}`;
        if (!map.has(key)) {
          map.set(key, { name: h.name.trim(), className: (h.className || '').trim() });
        }
      }
    });
    masterStudents = Array.from(map.values());
  }

  function loadFromStorage() {
    try {
      // Clear demo data if present from earlier runs
      if (!localStorage.getItem('khmer_wheel_demo_cleared_v2')) {
        localStorage.removeItem('khmer_wheel_students');
        localStorage.removeItem('khmer_wheel_master_students');
        localStorage.removeItem('khmer_wheel_history');
        localStorage.setItem('khmer_wheel_user_cleared', 'true');
        localStorage.setItem('khmer_wheel_demo_cleared_v2', 'true');
      }

      const savedMaster = localStorage.getItem('khmer_wheel_master_students');
      if (savedMaster) {
        const parsedMaster = JSON.parse(savedMaster);
        masterStudents = Array.isArray(parsedMaster) ? parsedMaster.map(normalizeStudent) : [];
      } else {
        masterStudents = [];
      }

      const savedStudents = localStorage.getItem('khmer_wheel_students');
      if (savedStudents) {
        const parsed = JSON.parse(savedStudents);
        students = Array.isArray(parsed) ? parsed.map(normalizeStudent) : [];
      } else {
        students = [];
      }

      const savedHistory = localStorage.getItem('khmer_wheel_history');
      if (savedHistory) {
        winnerHistory = JSON.parse(savedHistory);
        currentRound = winnerHistory.length + 1;
      } else {
        winnerHistory = [];
        currentRound = 1;
      }

      syncMasterStudentsWithHistory();

      // ពេលចូលប្រព័ន្ធ កុំដកឈ្មោះសិស្សពីកង គឺដាក់សិស្សទាំងអស់មកលើកងវិលវិញ
      if (masterStudents.length > 0) {
        students = masterStudents.map(normalizeStudent);
      } else if (students.length > 0) {
        masterStudents = students.map(normalizeStudent);
      }

      const savedTheme = localStorage.getItem('khmer_wheel_theme');
      if (savedTheme && THEMES.some((t) => t.id === savedTheme)) {
        currentTheme = savedTheme;
      }

      const savedSettings = localStorage.getItem('khmer_wheel_settings');
      if (savedSettings) {
        const settings = JSON.parse(savedSettings);
        autoRemove = !!settings.autoRemove;
        soundEnabled = settings.soundEnabled !== false;
        spinDuration = settings.spinDuration || 6;
        if (settings.selectedFont) selectedFont = settings.selectedFont;
        if (settings.wheelFontScale) wheelFontScale = settings.wheelFontScale;
        if (settings.selectedClassFilter) selectedClassFilter = settings.selectedClassFilter;
        if (settings.displayViewMode) displayViewMode = settings.displayViewMode;
        googleSheetUrl = settings.googleSheetUrl || DEFAULT_GOOGLE_SHEET_URL;
        if (settings.lastSheetSyncTime) lastSheetSyncTime = settings.lastSheetSyncTime;
        if (!savedTheme && settings.currentTheme && THEMES.some((t) => t.id === settings.currentTheme)) {
          currentTheme = settings.currentTheme;
        }
      }
    } catch (e) {
      console.warn('Storage error:', e);
      students = [];
      masterStudents = [];
    }
  }

  function saveToStorage() {
    try {
      localStorage.setItem('khmer_wheel_students', JSON.stringify(students));
      localStorage.setItem('khmer_wheel_master_students', JSON.stringify(masterStudents));
      localStorage.setItem('khmer_wheel_history', JSON.stringify(winnerHistory));
      localStorage.setItem('khmer_wheel_theme', currentTheme);
      localStorage.setItem(
        'khmer_wheel_settings',
        JSON.stringify({
          autoRemove,
          soundEnabled,
          spinDuration,
          selectedFont,
          wheelFontScale,
          selectedClassFilter,
          displayViewMode,
          googleSheetUrl,
          lastSheetSyncTime,
          currentTheme
        })
      );
    } catch (e) {
      console.warn('Could not save to storage:', e);
    }
  }

  // --------------------------------------------------------------------------
  // Web Audio Synthesizer (Zero External Dependencies)
  // --------------------------------------------------------------------------
  function initAudio() {
    if (!audioCtx) {
      const AudioContextClass = window.AudioContext || window.webkitAudioContext;
      if (AudioContextClass) {
        audioCtx = new AudioContextClass();
      }
    }
    if (audioCtx && audioCtx.state === 'suspended') {
      audioCtx.resume();
    }
  }

  function playTickSound() {
    if (!soundEnabled) return;
    initAudio();
    if (!audioCtx) return;

    try {
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(800 + Math.random() * 200, audioCtx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(120, audioCtx.currentTime + 0.04);

      gain.gain.setValueAtTime(0.35, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.04);

      osc.connect(gain);
      gain.connect(audioCtx.destination);

      osc.start();
      osc.stop(audioCtx.currentTime + 0.045);
    } catch (e) {
      console.error(e);
    }
  }

  function playCelebrationFanfare() {
    if (!soundEnabled) return;
    initAudio();
    if (!audioCtx) return;

    const now = audioCtx.currentTime;

    const chords = [
      { time: 0, notes: [261.63, 329.63, 392.0], dur: 0.18 },
      { time: 0.2, notes: [261.63, 329.63, 392.0], dur: 0.18 },
      { time: 0.4, notes: [349.23, 440.0, 523.25], dur: 0.28 },
      { time: 0.72, notes: [392.0, 493.88, 587.33], dur: 0.28 },
      { time: 1.05, notes: [523.25, 659.25, 783.99, 1046.5], dur: 1.4 }
    ];

    chords.forEach(({ time, notes, dur }) => {
      notes.forEach((freq) => {
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();

        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(freq, now + time);

        const filter = audioCtx.createBiquadFilter();
        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(1800, now + time);

        gain.gain.setValueAtTime(0.001, now + time);
        gain.gain.linearRampToValueAtTime(0.18 / notes.length, now + time + 0.04);
        gain.gain.exponentialRampToValueAtTime(0.001, now + time + dur);

        osc.connect(filter);
        filter.connect(gain);
        gain.connect(audioCtx.destination);

        osc.start(now + time);
        osc.stop(now + time + dur + 0.05);
      });
    });

    const sparkleNotes = [1046.5, 1318.51, 1567.98, 2093.0, 2637.02];
    sparkleNotes.forEach((freq, idx) => {
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now + 1.2 + idx * 0.1);

      gain.gain.setValueAtTime(0.12, now + 1.2 + idx * 0.1);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 1.2 + idx * 0.1 + 0.5);

      osc.connect(gain);
      gain.connect(audioCtx.destination);

      osc.start(now + 1.2 + idx * 0.1);
      osc.stop(now + 1.2 + idx * 0.1 + 0.55);
    });
  }

  // --------------------------------------------------------------------------
  // Canvas Wheel Drawing Engine
  // --------------------------------------------------------------------------
  function setupHiDPICanvas() {
    const dpr = Math.min(window.devicePixelRatio || 1, 2.5);
    const rect = wheelCanvas.getBoundingClientRect();
    const container = wheelCanvas.parentElement;
    const containerWidth = container ? container.clientWidth : 0;
    let size = rect.width > 50 ? rect.width : (containerWidth > 50 ? containerWidth : 0);
    if (!size) {
      size = isMobileLayoutActive() ? Math.min(window.innerWidth * 0.88, 350) : 520;
    }

    wheelCanvas.width = Math.round(size * dpr);
    wheelCanvas.height = Math.round(size * dpr);
    wheelCtx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }

  function drawWheel() {
    const dpr = Math.min(window.devicePixelRatio || 1, 2.5);
    let size = wheelCanvas.width / dpr;
    if (!size || size < 40) {
      setupHiDPICanvas();
      size = wheelCanvas.width / dpr;
    }
    const center = size / 2;
    const radius = Math.max(center - 14, 10);

    wheelCtx.clearRect(0, 0, size, size);

    const activeStudents = getActiveStudents();
    const count = activeStudents.length;

    if (count === 0) {
      drawEmptyWheel(center, radius);
      return;
    }

    const arc = (2 * Math.PI) / count;
    const activeTheme = getActiveTheme();
    const palette = (activeTheme.slicePalette && activeTheme.slicePalette.length > 0)
      ? activeTheme.slicePalette
      : SLICE_PALETTES;
    const dividerColor = activeTheme.dividerColor || '#ffd74d';

    for (let i = 0; i < count; i++) {
      const angle = currentRotation + i * arc;
      const sliceColor = palette[i % palette.length];

      wheelCtx.beginPath();
      wheelCtx.moveTo(center, center);
      wheelCtx.arc(center, center, radius, angle, angle + arc);
      wheelCtx.closePath();

      // Slice background
      wheelCtx.fillStyle = sliceColor;
      wheelCtx.fill();

      // Slice inner highlight
      const grad = wheelCtx.createRadialGradient(center, center, radius * 0.1, center, center, radius);
      grad.addColorStop(0, 'rgba(255, 255, 255, 0.18)');
      grad.addColorStop(0.7, 'rgba(0, 0, 0, 0.05)');
      grad.addColorStop(1, 'rgba(0, 0, 0, 0.45)');
      wheelCtx.fillStyle = grad;
      wheelCtx.fill();

      // Divider line
      wheelCtx.lineWidth = count > 24 ? 1.5 : 2.5;
      wheelCtx.strokeStyle = dividerColor;
      wheelCtx.stroke();

      // Draw Student Name & Class Text
      wheelCtx.save();
      wheelCtx.translate(center, center);
      wheelCtx.rotate(angle + arc / 2);

      wheelCtx.textAlign = 'right';
      wheelCtx.textBaseline = 'middle';

      let baseFontSize = 16;
      if (count <= 10) baseFontSize = 22;
      else if (count <= 18) baseFontSize = 18;
      else if (count <= 30) baseFontSize = 15;
      else baseFontSize = 12;

      const scaleMult = wheelFontScale === 'sm' ? 0.85 : wheelFontScale === 'lg' ? 1.25 : 1.0;
      const fontSize = Math.round(baseFontSize * scaleMult);

      wheelCtx.font = `600 ${fontSize}px "${selectedFont}", "Kantumruy Pro", "Siemreap", sans-serif`;

      wheelCtx.shadowColor = 'rgba(0, 0, 0, 0.85)';
      wheelCtx.shadowBlur = 4;
      wheelCtx.shadowOffsetX = 1;
      wheelCtx.shadowOffsetY = 1;
      wheelCtx.fillStyle = '#ffffff';

      const studentObj = activeStudents[i];
      let displayName = studentObj.name;
      if (selectedClassFilter === 'all' && studentObj.className) {
        displayName += ` (${studentObj.className})`;
      }

      const maxTextWidth = radius - 75;
      if (wheelCtx.measureText(displayName).width > maxTextWidth) {
        while (displayName.length > 3 && wheelCtx.measureText(displayName + '...').width > maxTextWidth) {
          displayName = displayName.slice(0, -1);
        }
        displayName += '...';
      }

      wheelCtx.fillText(displayName, radius - 26, 0);
      wheelCtx.restore();
    }

    drawOuterRim(center, radius, count);
  }

  function drawEmptyWheel(center, radius) {
    const activeTheme = getActiveTheme();
    wheelCtx.beginPath();
    wheelCtx.arc(center, center, radius, 0, 2 * Math.PI);
    wheelCtx.fillStyle = '#1e0307';
    wheelCtx.fill();

    wheelCtx.lineWidth = 6;
    wheelCtx.strokeStyle = activeTheme.rimColor || '#d49b00';
    wheelCtx.stroke();

    wheelCtx.beginPath();
    wheelCtx.arc(center, center, radius - 6, 0, 2 * Math.PI);
    wheelCtx.lineWidth = 1.5;
    wheelCtx.strokeStyle = activeTheme.dividerColor || 'rgba(255, 215, 77, 0.4)';
    wheelCtx.stroke();

    drawOuterRim(center, radius, 16);

    wheelCtx.textAlign = 'center';
    wheelCtx.textBaseline = 'middle';
    wheelCtx.font = `600 18px "${selectedFont}", "Kantumruy Pro", sans-serif`;
    wheelCtx.fillStyle = activeTheme.accentColor || '#ffd74d';
    const masterForFilter = masterStudents.filter((m) => {
      const norm = normalizeStudent(m);
      return selectedClassFilter === 'all' || norm.className === selectedClassFilter;
    });

    if (masterForFilter.length > 0) {
      wheelCtx.fillText('🎉 ចាប់ឈ្មោះសិស្សអស់ហើយ!', center, center - 16);
      wheelCtx.font = `400 13.5px "${selectedFont}", "Kantumruy Pro", sans-serif`;
      wheelCtx.fillStyle = '#e0cfb8';
      wheelCtx.fillText('សូមចុច «🔄 កំណត់ឡើងវិញ» ដើម្បីបង្វិលម្តងទៀត', center, center + 14);
    } else if (selectedClassFilter !== 'all') {
      wheelCtx.fillText(`គ្មានសិស្សក្នុងថ្នាក់ ${selectedClassFilter}`, center, center - 16);
      wheelCtx.font = `400 13.5px "${selectedFont}", "Kantumruy Pro", sans-serif`;
      wheelCtx.fillStyle = '#e0cfb8';
      wheelCtx.fillText('សូមបញ្ចូលឈ្មោះ ឬជ្រើសរើសថ្នាក់ផ្សេង', center, center + 14);
    } else {
      wheelCtx.fillText('មិនទាន់មានឈ្មោះសិស្ស', center, center - 16);
      wheelCtx.font = `400 13.5px "${selectedFont}", "Kantumruy Pro", sans-serif`;
      wheelCtx.fillStyle = '#e0cfb8';
      wheelCtx.fillText('សូមបញ្ចូលឈ្មោះ ឬនាំចូល Excel', center, center + 14);
    }
  }

  function drawOuterRim(center, radius, count) {
    const activeTheme = getActiveTheme();
    const rimColor = activeTheme.rimColor || '#d49b00';
    const dividerColor = activeTheme.dividerColor || '#fff299';

    wheelCtx.beginPath();
    wheelCtx.arc(center, center, radius, 0, 2 * Math.PI);
    wheelCtx.lineWidth = 8;
    wheelCtx.strokeStyle = rimColor;
    wheelCtx.stroke();

    wheelCtx.beginPath();
    wheelCtx.arc(center, center, radius - 4, 0, 2 * Math.PI);
    wheelCtx.lineWidth = 1.5;
    wheelCtx.strokeStyle = dividerColor;
    wheelCtx.stroke();

    const studCount = Math.max(16, Math.min(count * 2, 48));
    const studAngleStep = (2 * Math.PI) / studCount;

    for (let s = 0; s < studCount; s++) {
      const sa = s * studAngleStep;
      const sx = center + (radius - 2) * Math.cos(sa);
      const sy = center + (radius - 2) * Math.sin(sa);

      wheelCtx.beginPath();
      wheelCtx.arc(sx, sy, 3, 0, 2 * Math.PI);
      wheelCtx.fillStyle = s % 2 === 0 ? '#ffffff' : (activeTheme.accentColor || '#ffd74d');
      wheelCtx.shadowColor = activeTheme.accentColor || '#ffd74d';
      wheelCtx.shadowBlur = 4;
      wheelCtx.fill();
      wheelCtx.shadowBlur = 0;
    }
  }

  // --------------------------------------------------------------------------
  // Pointer Angle & Winner Calculation
  // --------------------------------------------------------------------------
  function getSelectedStudentIndex(angle) {
    const activeStudents = getActiveStudents();
    if (activeStudents.length === 0) return -1;
    const arc = (2 * Math.PI) / activeStudents.length;
    const pointerAngle = 1.5 * Math.PI;

    const normalizedRotation = ((angle % (2 * Math.PI)) + 2 * Math.PI) % (2 * Math.PI);
    const relativeAngle = ((pointerAngle - normalizedRotation) + 2 * Math.PI) % (2 * Math.PI);

    return Math.floor(relativeAngle / arc) % activeStudents.length;
  }

  // --------------------------------------------------------------------------
  // Spin Animation Physics
  // --------------------------------------------------------------------------
  function spin() {
    if (isSpinning) return;
    const activeStudents = getActiveStudents();
    if (activeStudents.length === 0) {
      alert('សូមបញ្ចូលឈ្មោះសិស្សយ៉ាងហោចណាស់ម្នាក់ដើម្បីបង្វិល!');
      return;
    }

    stopWinnerSpeech();
    initAudio();
    isSpinning = true;
    spinBtn.disabled = true;
    centerSpinBtn.style.pointerEvents = 'none';

    const fullRounds = 5 + Math.floor(Math.random() * 4);
    const extraAngle = Math.random() * 2 * Math.PI;
    const targetDelta = fullRounds * 2 * Math.PI + extraAngle;

    const startAngle = currentRotation;
    const targetAngle = startAngle + targetDelta;
    const durationMs = spinDuration * 1000;
    const startTime = performance.now();

    lastSliceIndex = getSelectedStudentIndex(startAngle);

    function animate(currentTime) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / durationMs, 1);

      const easeOut = 1 - Math.pow(1 - progress, 4);

      currentRotation = startAngle + targetDelta * easeOut;
      drawWheel();

      const currentSlice = getSelectedStudentIndex(currentRotation);
      if (currentSlice !== lastSliceIndex) {
        lastSliceIndex = currentSlice;
        triggerPointerTick();
        playTickSound();
      }

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        currentRotation = targetAngle % (2 * Math.PI);
        drawWheel();
        finishSpin();
      }
    }

    requestAnimationFrame(animate);
  }

  function triggerPointerTick() {
    pointerWrapper.classList.add('tick');
    setTimeout(() => {
      pointerWrapper.classList.remove('tick');
    }, 60);
  }

  function finishSpin() {
    isSpinning = false;
    spinBtn.disabled = false;
    centerSpinBtn.style.pointerEvents = 'auto';

    const activeStudents = getActiveStudents();
    const winnerIndex = getSelectedStudentIndex(currentRotation);
    const winner = activeStudents[winnerIndex];
    lastWinningStudent = winner;

    const now = new Date();
    const timeFormatted = now.toLocaleTimeString('km-KH', { hour: '2-digit', minute: '2-digit' });
    const historyItem = {
      name: winner.name,
      className: winner.className || '',
      time: timeFormatted,
      round: currentRound
    };
    winnerHistory.unshift(historyItem);
    currentRound++;
    saveToStorage();
    renderHistory();
    triggerAutoSyncToGoogleSheet(`បានកត់ត្រាអ្នកឈ្នះ «${winner.name}»`);

    showWinnerCelebration(winner, historyItem);
  }


  // --------------------------------------------------------------------------
  // Confetti Particle System
  // --------------------------------------------------------------------------
  function initConfetti() {
    confettiCanvas = document.getElementById('confettiCanvas');
    confettiCtx = confettiCanvas.getContext('2d');
    resizeConfetti();
    window.addEventListener('resize', resizeConfetti);
  }

  function resizeConfetti() {
    if (!confettiCanvas) return;
    confettiCanvas.width = window.innerWidth;
    confettiCanvas.height = window.innerHeight;
  }

  function startConfetti() {
    resizeConfetti();
    confettiParticles = [];
    const particleCount = 160;
    const colors = ['#ffd700', '#ffaa00', '#ff3366', '#00d2d3', '#10ac84', '#ffffff', '#ff9ff3'];

    for (let i = 0; i < particleCount; i++) {
      confettiParticles.push({
        x: window.innerWidth / 2 + (Math.random() - 0.5) * 200,
        y: window.innerHeight / 2 + (Math.random() - 0.5) * 100,
        vx: (Math.random() - 0.5) * 24,
        vy: -Math.random() * 18 - 8,
        size: Math.random() * 9 + 5,
        color: colors[Math.floor(Math.random() * colors.length)],
        rotation: Math.random() * 360,
        rotSpeed: (Math.random() - 0.5) * 14,
        gravity: 0.38 + Math.random() * 0.15,
        drag: 0.965,
        shape: Math.random() > 0.4 ? 'ribbon' : 'circle',
        wobble: Math.random() * 10,
        opacity: 1
      });
    }

    if (confettiAnimationId) cancelAnimationFrame(confettiAnimationId);
    animateConfetti();
  }

  function animateConfetti() {
    confettiCtx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);

    let activeCount = 0;
    for (let i = 0; i < confettiParticles.length; i++) {
      const p = confettiParticles[i];

      p.vx *= p.drag;
      p.vy += p.gravity;
      p.x += p.vx + Math.cos(p.wobble) * 1.5;
      p.y += p.vy;
      p.wobble += 0.08;
      p.rotation += p.rotSpeed;

      if (p.y < window.innerHeight + 50) {
        activeCount++;

        confettiCtx.save();
        confettiCtx.translate(p.x, p.y);
        confettiCtx.rotate((p.rotation * Math.PI) / 180);
        confettiCtx.fillStyle = p.color;

        if (p.shape === 'ribbon') {
          confettiCtx.fillRect(-p.size / 2, -p.size / 4, p.size, p.size / 2);
        } else {
          confettiCtx.beginPath();
          confettiCtx.arc(0, 0, p.size / 2.5, 0, 2 * Math.PI);
          confettiCtx.fill();
        }
        confettiCtx.restore();
      }
    }

    if (activeCount > 0 && winnerModalOverlay.classList.contains('active')) {
      confettiAnimationId = requestAnimationFrame(animateConfetti);
    } else {
      confettiCtx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);
    }
  }

  function stopConfetti() {
    if (confettiAnimationId) {
      cancelAnimationFrame(confettiAnimationId);
      confettiAnimationId = null;
    }
    if (confettiCtx && confettiCanvas) {
      confettiCtx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);
    }
  }

  // --------------------------------------------------------------------------
  // Winner Speech Synthesis & Modal Presentation
  // --------------------------------------------------------------------------
  let speechTimer = null;

  function stopWinnerSpeech() {
    if (speechTimer) {
      clearTimeout(speechTimer);
      speechTimer = null;
    }
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      try {
        window.speechSynthesis.cancel();
      } catch (e) {}
    }
  }

  function speakWinner(winnerName, immediate = false) {
    if (!soundEnabled) return;
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;

    stopWinnerSpeech();

    const doSpeak = () => {
      try {
        const text = `អ្នកឈ្នះគឺ ${winnerName}`;
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = 'km-KH';
        utterance.rate = 0.92;
        utterance.pitch = 1.05;
        utterance.volume = 1.0;

        const voices = window.speechSynthesis.getVoices();
        const khmerVoice = voices.find(
          (v) => v.lang && (v.lang.toLowerCase().startsWith('km') || v.lang.toLowerCase().includes('khmer'))
        );
        if (khmerVoice) {
          utterance.voice = khmerVoice;
        }

        window.speechSynthesis.speak(utterance);
      } catch (err) {
        console.warn('Speech synthesis error:', err);
      }
    };

    if (immediate) {
      doSpeak();
    } else {
      // Delay 750ms so fanfare chord leads into speech smoothly
      speechTimer = setTimeout(doSpeak, 750);
    }
  }

  function showWinnerCelebration(winner, item) {
    if (winnerTitleText) {
      winnerTitleText.textContent = 'អ្នកឈ្នះគឺ';
    }
    winnerNameDisplay.textContent = winner.name;
    winnerNameDisplay.style.fontFamily = `"${selectedFont}", var(--font-title), sans-serif`;

    if (winner.className) {
      winnerClassDisplay.textContent = `ថ្នាក់៖ ${winner.className}`;
      winnerClassDisplay.style.display = 'inline-block';
    } else {
      winnerClassDisplay.style.display = 'none';
    }

    winnerMetaText.textContent = `ជុំទី ${item.round} • វេលាម៉ោង ${item.time}`;

    winnerModalOverlay.classList.add('active');
    startConfetti();
    playCelebrationFanfare();
    speakWinner(winner.name);

    if (autoRemove) {
      btnRemoveWinner.textContent = '❌ ឈ្មោះត្រូវបានដកចេញ';
      btnRemoveWinner.disabled = true;
      removeStudent(winner);
    } else {
      btnRemoveWinner.textContent = '❌ ដកឈ្មោះចេញ';
      btnRemoveWinner.disabled = false;
    }
  }

  function closeWinnerModal() {
    stopWinnerSpeech();
    winnerModalOverlay.classList.remove('active');
    stopConfetti();
  }

  // --------------------------------------------------------------------------
  // Student List Operations & UI
  // --------------------------------------------------------------------------
  function renderStudentList() {
    studentList.innerHTML = '';
    const activeStudents = getActiveStudents();
    studentCountBadge.textContent = activeStudents.length;
    if (mobileStudentBadge) {
      mobileStudentBadge.textContent = students.length;
    }

    if (activeStudents.length === 0) {
      const emptyLi = document.createElement('li');
      emptyLi.className = 'student-empty';
      const msg = selectedClassFilter !== 'all'
        ? `មិនទាន់មានសិស្សក្នុងថ្នាក់ ${selectedClassFilter} នៅឡើយទេ`
        : 'មិនទាន់មានឈ្មោះសិស្សនៅឡើយទេ';
      emptyLi.innerHTML = `
        <div style="font-size: 1.8rem; margin-bottom: 6px;">📝</div>
        <div style="font-weight: 600; color: var(--gold-200); font-size: 0.95rem;">${msg}</div>
        <small style="color: var(--text-dim); display: block; margin-top: 5px; line-height: 1.45;">
          សូមបញ្ចូលឈ្មោះក្នុងប្រអប់ខាងលើ ឬចុចប៊ូតុង <strong>«📊 នាំចូល Excel»</strong>
        </small>
      `;
      studentList.appendChild(emptyLi);
      drawWheel();
      return;
    }

    activeStudents.forEach((student, index) => {
      const li = document.createElement('li');
      li.className = 'student-item';

      const infoDiv = document.createElement('div');
      infoDiv.className = 'student-info';

      const indexSpan = document.createElement('span');
      indexSpan.className = 'student-index';
      indexSpan.textContent = index + 1;

      const nameSpan = document.createElement('span');
      nameSpan.className = 'student-name';
      nameSpan.style.fontFamily = `"${selectedFont}", sans-serif`;
      nameSpan.textContent = student.name;

      infoDiv.appendChild(indexSpan);
      infoDiv.appendChild(nameSpan);

      if (student.className) {
        const classBadge = document.createElement('span');
        classBadge.className = 'student-class-badge';
        classBadge.textContent = student.className;
        infoDiv.appendChild(classBadge);
      }

      const actionsDiv = document.createElement('div');
      actionsDiv.className = 'student-actions';

      const editBtn = document.createElement('button');
      editBtn.type = 'button';
      editBtn.className = 'btn-edit-student';
      editBtn.title = 'កែប្រែឈ្មោះ និងថ្នាក់';
      editBtn.innerHTML = '✏️';
      editBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        openEditStudentModal(student);
      });

      const delBtn = document.createElement('button');
      delBtn.type = 'button';
      delBtn.className = 'btn-delete-student';
      delBtn.title = 'លុបឈ្មោះចេញពីបញ្ជី';
      delBtn.innerHTML = '✕';
      delBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        deleteStudentPermanently(student);
      });

      actionsDiv.appendChild(editBtn);
      actionsDiv.appendChild(delBtn);

      li.appendChild(infoDiv);
      li.appendChild(actionsDiv);
      studentList.appendChild(li);
    });

    checkWheelFinishedState();
    drawWheel();
  }

  function openEditStudentModal(student) {
    if (!editStudentModalOverlay) return;
    const norm = normalizeStudent(student);
    if (editStudentOriginalName) editStudentOriginalName.value = norm.name;
    if (editStudentOriginalClass) editStudentOriginalClass.value = norm.className;
    if (editStudentNameInput) editStudentNameInput.value = norm.name;
    if (editStudentClassInput) editStudentClassInput.value = norm.className;
    editStudentModalOverlay.classList.add('active');
    setTimeout(() => {
      if (editStudentNameInput) editStudentNameInput.focus();
    }, 100);
  }

  function closeEditStudentModal() {
    if (editStudentModalOverlay) {
      editStudentModalOverlay.classList.remove('active');
    }
  }

  function saveEditedStudent() {
    const origName = (editStudentOriginalName ? editStudentOriginalName.value : '').trim();
    const origClass = (editStudentOriginalClass ? editStudentOriginalClass.value : '').trim();
    const newName = (editStudentNameInput ? editStudentNameInput.value : '').trim();
    const newClass = (editStudentClassInput ? editStudentClassInput.value : '').trim();

    if (!newName) {
      alert('សូមបញ្ចូលឈ្មោះសិស្ស!');
      if (editStudentNameInput) editStudentNameInput.focus();
      return;
    }

    const idx = students.findIndex((s) => {
      const n = normalizeStudent(s);
      return n.name === origName && n.className === origClass;
    });

    if (idx !== -1) {
      students[idx] = { name: newName, className: newClass };
    }

    const masterIdx = masterStudents.findIndex((s) => {
      const n = normalizeStudent(s);
      return n.name === origName && n.className === origClass;
    });
    if (masterIdx !== -1) {
      masterStudents[masterIdx] = { name: newName, className: newClass };
    } else {
      masterStudents.push({ name: newName, className: newClass });
    }

    saveToStorage();
    updateClassFilterUI();
    renderStudentList();
    triggerAutoSyncToGoogleSheet(`បានកែប្រែសិស្ស «${newName}»`);
    closeEditStudentModal();
  }

  function addStudent(name, className) {
    const trimmedName = name.trim();
    if (!trimmedName) return;
    const item = {
      name: trimmedName,
      className: (className || '').trim()
    };
    students.push(item);
    if (!masterStudents.some((m) => m.name === item.name && m.className === item.className)) {
      masterStudents.push(item);
    }
    saveToStorage();
    updateClassFilterUI();
    renderStudentList();
    triggerAutoSyncToGoogleSheet(`បានបន្ថែមសិស្ស «${trimmedName}»`);
  }

  function removeStudent(studentToRemove) {
    const normToRemove = normalizeStudent(studentToRemove);
    const idx = students.findIndex((s) => {
      const n = normalizeStudent(s);
      return n.name === normToRemove.name && n.className === normToRemove.className;
    });

    if (idx !== -1) {
      students.splice(idx, 1);
      saveToStorage();
      updateClassFilterUI();
      renderStudentList();
      checkWheelFinishedState();
      triggerAutoSyncToGoogleSheet(`បានដកសិស្ស «${normToRemove.name}»`);
    }
  }

  function deleteStudentPermanently(studentToDelete) {
    const norm = normalizeStudent(studentToDelete);
    students = students.filter((s) => {
      const n = normalizeStudent(s);
      return !(n.name === norm.name && n.className === norm.className);
    });
    masterStudents = masterStudents.filter((s) => {
      const n = normalizeStudent(s);
      return !(n.name === norm.name && n.className === norm.className);
    });
    saveToStorage();
    updateClassFilterUI();
    renderStudentList();
    checkWheelFinishedState();
    triggerAutoSyncToGoogleSheet(`បានលុបសិស្ស «${norm.name}»`);
  }

  // --------------------------------------------------------------------------
  // Reset & Spin-Again Core Engine
  // --------------------------------------------------------------------------
  let toastTimer = null;
  function showToast(msg, icon = '✨') {
    if (!toastNotification) return;
    if (toastTimer) clearTimeout(toastTimer);

    if (toastIcon) toastIcon.textContent = icon;
    if (toastMessage) toastMessage.textContent = msg;

    toastNotification.style.display = 'flex';
    toastTimer = setTimeout(() => {
      if (toastNotification) toastNotification.style.display = 'none';
    }, 3500);
  }

  function playResetChime() {
    if (!soundEnabled) return;
    initAudio();
    if (!audioCtx) return;
    try {
      const now = audioCtx.currentTime;
      const notes = [523.25, 659.25, 783.99, 1046.5]; // C5, E5, G5, C6
      notes.forEach((freq, idx) => {
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now + idx * 0.08);
        gain.gain.setValueAtTime(0.001, now + idx * 0.08);
        gain.gain.linearRampToValueAtTime(0.12, now + idx * 0.08 + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.08 + 0.35);
        osc.connect(gain);
        gain.connect(audioCtx.destination);
        osc.start(now + idx * 0.08);
        osc.stop(now + idx * 0.08 + 0.38);
      });
    } catch (e) {
      console.warn(e);
    }
  }

  function updateRosterRemovedNotice() {
    const diff = masterStudents.length - students.length;
    if (rosterRemovedNotice) {
      if (diff > 0) {
        rosterRemovedNotice.style.display = 'block';
        if (removedStudentsCount) {
          removedStudentsCount.textContent = diff;
        }
      } else {
        rosterRemovedNotice.style.display = 'none';
      }
    }
    if (resetRestoreBadge) {
      resetRestoreBadge.textContent = diff > 0 ? `+${diff} នាក់` : 'ស្ដារ';
    }
  }

  function checkWheelFinishedState() {
    const active = getActiveStudents();
    const masterForFilter = masterStudents.filter((m) => {
      const norm = normalizeStudent(m);
      return selectedClassFilter === 'all' || norm.className === selectedClassFilter;
    });

    if (wheelFinishedOverlay) {
      if (active.length === 0 && masterForFilter.length > 0) {
        wheelFinishedOverlay.style.display = 'flex';
      } else {
        wheelFinishedOverlay.style.display = 'none';
      }
    }

    updateRosterRemovedNotice();
  }

  function resetWheelStudents(options = {}) {
    if (isSpinning) return;

    const {
      restoreAll = true,
      clearHistory = false,
      resetAngle = true,
      silent = false,
      spinNext = false
    } = options;

    if (restoreAll) {
      if (selectedClassFilter === 'all') {
        students = masterStudents.map(normalizeStudent);
      } else {
        const currentOtherClasses = students.filter((s) => {
          const n = normalizeStudent(s);
          return n.className !== selectedClassFilter;
        });
        const masterOfThisClass = masterStudents.filter((m) => {
          const n = normalizeStudent(m);
          return n.className === selectedClassFilter;
        });
        students = [...currentOtherClasses, ...masterOfThisClass];
      }
    }

    if (clearHistory) {
      winnerHistory = [];
      currentRound = 1;
      renderHistory();
    }

    if (resetAngle) {
      currentRotation = 0;
    }

    saveToStorage();
    updateClassFilterUI();
    renderStudentList();
    drawWheel();
    checkWheelFinishedState();
    triggerAutoSyncToGoogleSheet('បានកំណត់កងវិលឡើងវិញ - ស្ដារសិស្សទាំងអស់');

    if (!silent) {
      playResetChime();
      const activeCount = getActiveStudents().length;
      showToast(`🔄 បានកំណត់កងវិលឡើងវិញរួចរាល់! មានសិស្ស ${activeCount} នាក់អាចបង្វិលម្តងទៀតបាន។`);
    }

    if (spinNext) {
      setTimeout(() => {
        spin();
      }, 350);
    }
  }

  function openResetModal() {
    if (isSpinning) return;
    if (resetModalOverlay) {
      updateRosterRemovedNotice();
      resetModalOverlay.classList.add('active');
    }
  }

  function closeResetModal() {
    if (resetModalOverlay) {
      resetModalOverlay.classList.remove('active');
    }
  }

  function shuffleStudents() {
    if (isSpinning) return;
    for (let i = students.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [students[i], students[j]] = [students[j], students[i]];
    }
    saveToStorage();
    renderStudentList();
  }

  function renderHistory() {
    historyCountBadge.textContent = winnerHistory.length;
    historyList.innerHTML = '';

    if (winnerHistory.length === 0) {
      const emptyLi = document.createElement('li');
      emptyLi.className = 'history-empty';
      emptyLi.textContent = 'មិនទាន់មានប្រវត្តិអ្នកឈ្នះនៅឡើយទេ';
      historyList.appendChild(emptyLi);
      return;
    }

    winnerHistory.forEach((item) => {
      const li = document.createElement('li');
      li.className = 'history-item';

      const left = document.createElement('div');
      left.className = 'history-item-left';

      const trophy = document.createElement('span');
      trophy.className = 'history-trophy';
      trophy.textContent = '🏆';

      const details = document.createElement('div');
      const name = document.createElement('div');
      name.className = 'history-item-name';
      name.textContent = item.name + (item.className ? ` [ថ្នាក់ ${item.className}]` : '');

      const meta = document.createElement('div');
      meta.className = 'history-item-time';
      meta.textContent = `ជុំទី ${item.round} • ម៉ោង ${item.time}`;

      details.appendChild(name);
      details.appendChild(meta);

      left.appendChild(trophy);
      left.appendChild(details);

      li.appendChild(left);
      historyList.appendChild(li);
    });
  }

  // --------------------------------------------------------------------------
  // Tab Switching
  // --------------------------------------------------------------------------
  function initTabs() {
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');

    tabButtons.forEach((btn) => {
      btn.addEventListener('click', () => {
        const targetTab = btn.getAttribute('data-tab');

        tabButtons.forEach((b) => b.classList.remove('active'));
        tabContents.forEach((c) => c.classList.remove('active'));

        btn.classList.add('active');
        const activeContent = document.getElementById(targetTab);
        if (activeContent) activeContent.classList.add('active');
      });
    });
  }

  // --------------------------------------------------------------------------
  // Excel Import & Sample Generation Engine
  // --------------------------------------------------------------------------
  function handleExcelFile(file) {
    if (!file) return;

    const reader = new FileReader();

    reader.onload = function (e) {
      try {
        let rows = [];

        if (typeof XLSX !== 'undefined') {
          const data = new Uint8Array(e.target.result);
          const workbook = XLSX.read(data, { type: 'array' });
          const firstSheetName = workbook.SheetNames[0];
          const sheet = workbook.Sheets[firstSheetName];
          rows = XLSX.utils.sheet_to_json(sheet, { header: 1, defval: '' });
        } else {
          // Fallback simple CSV parser if SheetJS is unavailable
          const text = new TextDecoder('utf-8').decode(e.target.result);
          rows = parseCSVText(text);
        }

        processExcelRows(rows, file.name);
      } catch (err) {
        console.error('Excel parse error:', err);
        alert('មានបញ្ហាក្នុងការអានឯកសារ Excel៖ ' + err.message);
      }
    };

    reader.readAsArrayBuffer(file);
  }

  function parseCSVText(text) {
    return text
      .split(/\r\n|\n/)
      .filter((line) => line.trim().length > 0)
      .map((line) => line.split(',').map((c) => c.trim().replace(/^["']|["']$/g, '')));
  }

  function processExcelRows(rows, fileName) {
    const cleanRows = rows.filter((r) => r && r.some((c) => String(c).trim().length > 0));
    if (cleanRows.length === 0) {
      alert('ឯកសារ Excel នេះគ្មានទិន្នន័យទេ!');
      return;
    }

    excelHeaders = cleanRows[0].map((h, i) => String(h).trim() || `ជួរឈរ ${i + 1}`);
    excelRawRows = cleanRows.slice(1);

    colNameSelect.innerHTML = '';
    colClassSelect.innerHTML = '<option value="-1">-- គ្មាន (None) --</option>';

    let detectedNameIdx = 0;
    let detectedClassIdx = -1;

    excelHeaders.forEach((header, idx) => {
      const hLower = header.toLowerCase();

      if (
        hLower.includes('ឈ្មោះ') ||
        hLower.includes('name') ||
        hLower.includes('student') ||
        hLower.includes('គោត្តនាម')
      ) {
        detectedNameIdx = idx;
      }

      if (
        hLower.includes('ថ្នាក់') ||
        hLower.includes('class') ||
        hLower.includes('grade') ||
        hLower.includes('room')
      ) {
        detectedClassIdx = idx;
      }

      const optName = document.createElement('option');
      optName.value = idx;
      optName.textContent = header;
      colNameSelect.appendChild(optName);

      const optClass = document.createElement('option');
      optClass.value = idx;
      optClass.textContent = header;
      colClassSelect.appendChild(optClass);
    });

    colNameSelect.value = detectedNameIdx;
    if (detectedClassIdx !== -1) {
      colClassSelect.value = detectedClassIdx;
    }

    excelFileInfo.textContent = `📄 ឯកសារ៖ ${fileName} • រកឃើញទិន្នន័យ ${excelRawRows.length} ជួរ`;
    excelPreviewSection.style.display = 'flex';
    btnConfirmImportExcel.disabled = false;

    renderExcelPreviewTable();
  }

  function renderExcelPreviewTable() {
    excelTableHead.innerHTML = '';
    excelTableBody.innerHTML = '';

    const trHead = document.createElement('tr');
    excelHeaders.forEach((h) => {
      const th = document.createElement('th');
      th.textContent = h;
      trHead.appendChild(th);
    });
    excelTableHead.appendChild(trHead);

    const previewRows = excelRawRows.slice(0, 6);
    previewRows.forEach((row) => {
      const tr = document.createElement('tr');
      excelHeaders.forEach((_, colIdx) => {
        const td = document.createElement('td');
        td.textContent = row[colIdx] !== undefined ? String(row[colIdx]) : '';
        tr.appendChild(td);
      });
      excelTableBody.appendChild(tr);
    });
  }

  function downloadSampleExcel() {
    const sampleData = [
      { 'ល.រ': 1, 'ឈ្មោះសិស្ស': 'សុខ ចាន់ដារ៉ា', 'ថ្នាក់': '12A', 'ភេទ': 'ប្រុស', 'សម្គាល់': 'សិស្សពូកែ' },
      { 'ល.រ': 2, 'ឈ្មោះសិស្ស': 'កែវ ពិសី', 'ថ្នាក់': '12A', 'ភេទ': 'ស្រី', 'សម្គាល់': '' },
      { 'ល.រ': 3, 'ឈ្មោះសិស្ស': 'ហេង រតនា', 'ថ្នាក់': '12B', 'ភេទ': 'ប្រុស', 'សម្គាល់': '' },
      { 'ល.រ': 4, 'ឈ្មោះសិស្ស': 'លី ស្រីម៉ៅ', 'ថ្នាក់': '12B', 'ភេទ': 'ស្រី', 'សម្គាល់': '' },
      { 'ល.រ': 5, 'ឈ្មោះសិស្ស': 'ចាន់ វិបុល', 'ថ្នាក់': '12A', 'ភេទ': 'ប្រុស', 'សម្គាល់': '' }
    ];

    if (typeof XLSX !== 'undefined') {
      const wb = XLSX.utils.book_new();
      const ws = XLSX.utils.json_to_sheet(sampleData);
      XLSX.utils.book_append_sheet(wb, ws, 'បញ្ជីឈ្មោះសិស្ស');
      XLSX.writeFile(wb, 'គំរូបញ្ជីឈ្មោះសិស្ស_Excel.xlsx');
    } else {
      let csv = '\uFEFFល.រ,ឈ្មោះសិស្ស,ថ្នាក់,ភេទ,សម្គាល់\r\n';
      sampleData.forEach((row) => {
        csv += `${row['ល.រ']},${row['ឈ្មោះសិស្ស']},${row['ថ្នាក់']},${row['ភេទ']},${row['សម្គាល់']}\r\n`;
      });
      const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'គំរូបញ្ជីឈ្មោះសិស្ស_Excel.csv';
      a.click();
      URL.revokeObjectURL(url);
    }
  }

  // --------------------------------------------------------------------------
  // Font Customization Helpers
  // --------------------------------------------------------------------------
  function applyFont(fontName) {
    selectedFont = fontName;
    if (fontSelect) fontSelect.value = fontName;
    if (fontSelectSetting) fontSelectSetting.value = fontName;

    document.documentElement.style.setProperty('--font-chosen', `"${fontName}", sans-serif`);
    saveToStorage();
    renderStudentList();
    drawWheel();
  }

  function applyFontScale(scale) {
    wheelFontScale = scale;
    btnSizes.forEach((b) => {
      b.classList.toggle('active', b.getAttribute('data-size') === scale);
    });

    if (fontSizeDisplay) {
      if (scale === 'sm') fontSizeDisplay.textContent = 'តូច';
      else if (scale === 'lg') fontSizeDisplay.textContent = 'ធំ';
      else fontSizeDisplay.textContent = 'មធ្យម (ធម្មតា)';
    }

    saveToStorage();
    drawWheel();
  }

  function isMobileLayoutActive() {
    if (displayViewMode === 'mobile') return true;
    if (displayViewMode === 'desktop') return false;
    return window.innerWidth <= 860;
  }

  function setMobileTab(tabName) {
    currentMobileTab = tabName;

    // Update bottom nav buttons
    mobileNavItems.forEach((btn) => {
      btn.classList.toggle('active', btn.getAttribute('data-nav') === tabName);
    });

    if (!isMobileLayoutActive()) {
      if (wheelSection) wheelSection.style.display = '';
      if (sidePanel) sidePanel.style.display = '';
      return;
    }

    if (tabName === 'wheel') {
      if (wheelSection) wheelSection.style.display = 'block';
      if (sidePanel) sidePanel.style.display = 'none';
      setTimeout(() => {
        setupHiDPICanvas();
        drawWheel();
      }, 50);
    } else {
      if (wheelSection) wheelSection.style.display = 'none';
      if (sidePanel) sidePanel.style.display = 'block';

      // Switch to corresponding tab inside side panel
      const targetTabId =
        tabName === 'roster' ? 'roster-tab' : tabName === 'history' ? 'history-tab' : 'settings-tab';
      const targetBtn = document.querySelector(`.tab-btn[data-tab="${targetTabId}"]`);
      if (targetBtn) {
        targetBtn.click();
      }
    }
  }

  function applyViewMode(mode) {
    displayViewMode = mode;
    document.body.classList.remove('view-mobile', 'view-desktop', 'view-auto');
    document.body.classList.add(`view-${mode}`);

    btnViewModes.forEach((btn) => {
      btn.classList.toggle('active', btn.getAttribute('data-mode') === mode);
    });

    btnModeSettings.forEach((btn) => {
      btn.classList.toggle('active', btn.getAttribute('data-mode') === mode);
    });

    if (viewModeDisplay) {
      if (mode === 'mobile') viewModeDisplay.textContent = '📱 ទូរស័ព្ទដៃ (Mobile View)';
      else if (mode === 'desktop') viewModeDisplay.textContent = '💻 កុំព្យូទ័រ (Desktop / Projector)';
      else viewModeDisplay.textContent = '🔄 ស្វ័យប្រវត្តិតាមអេក្រង់ (Auto)';
    }

    saveToStorage();

    if (isMobileLayoutActive()) {
      setMobileTab(currentMobileTab || 'wheel');
    } else {
      if (wheelSection) wheelSection.style.display = '';
      if (sidePanel) sidePanel.style.display = '';
    }

    // Re-render canvas with new sizing
    setTimeout(() => {
      setupHiDPICanvas();
      drawWheel();
      resizeConfetti();
    }, 60);
  }

  // --------------------------------------------------------------------------
  // Event Listeners Setup
  // --------------------------------------------------------------------------
  function setupEvents() {
    // View Mode button clicks (Top bar & Settings)
    btnViewModes.forEach((btn) => {
      btn.addEventListener('click', () => {
        applyViewMode(btn.getAttribute('data-mode'));
      });
    });

    btnModeSettings.forEach((btn) => {
      btn.addEventListener('click', () => {
        applyViewMode(btn.getAttribute('data-mode'));
      });
    });

    const btnQuickSwitchDesktop = document.getElementById('btnQuickSwitchDesktop');
    if (btnQuickSwitchDesktop) {
      btnQuickSwitchDesktop.addEventListener('click', () => {
        applyViewMode('desktop');
      });
    }

    // Spin buttons
    spinBtn.addEventListener('click', spin);
    centerSpinBtn.addEventListener('click', spin);

    // Shuffle
    shuffleBtn.addEventListener('click', shuffleStudents);

    // Sound Toggle
    soundToggleBtn.addEventListener('click', () => {
      soundEnabled = !soundEnabled;
      soundIcon.textContent = soundEnabled ? '🔊' : '🔇';
      soundSettingToggle.checked = soundEnabled;
      saveToStorage();
    });

    soundSettingToggle.addEventListener('change', (e) => {
      soundEnabled = e.target.checked;
      soundIcon.textContent = soundEnabled ? '🔊' : '🔇';
      saveToStorage();
    });

    // Fullscreen Toggle
    fullscreenBtn.addEventListener('click', () => {
      if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen().catch(() => {});
        fullscreenIcon.textContent = '⛶';
      } else {
        document.exitFullscreen().catch(() => {});
        fullscreenIcon.textContent = '⛶';
      }
    });

    // Add Student Form
    addStudentForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const nameVal = newStudentInput.value;
      const classVal = newStudentClassInput.value;
      if (nameVal) {
        addStudent(nameVal, classVal);
        newStudentInput.value = '';
        newStudentClassInput.value = '';
        newStudentInput.focus();
      }
    });

    // Class Filter Dropdown Change
    classFilterSelect.addEventListener('change', (e) => {
      setClassFilter(e.target.value);
    });

    // Reset Wheel and Finished Overlay buttons
    if (resetWheelBtn) {
      resetWheelBtn.addEventListener('click', openResetModal);
    }

    if (btnResetRoster) {
      btnResetRoster.addEventListener('click', openResetModal);
    }

    if (btnFinishedReset) {
      btnFinishedReset.addEventListener('click', () => {
        resetWheelStudents({ restoreAll: true, clearHistory: false, resetAngle: true });
      });
    }

    if (btnRestoreInline) {
      btnRestoreInline.addEventListener('click', () => {
        resetWheelStudents({ restoreAll: true, clearHistory: false, resetAngle: false });
      });
    }

    // Reset Modal Choices
    if (btnCancelResetModal) {
      btnCancelResetModal.addEventListener('click', closeResetModal);
    }
    if (btnCloseResetModal) {
      btnCloseResetModal.addEventListener('click', closeResetModal);
    }
    if (btnOptRestoreAll) {
      btnOptRestoreAll.addEventListener('click', () => {
        closeResetModal();
        resetWheelStudents({ restoreAll: true, clearHistory: false, resetAngle: true });
      });
    }
    if (btnOptFreshStart) {
      btnOptFreshStart.addEventListener('click', () => {
        closeResetModal();
        if (confirm('តើអ្នកចង់ចាប់ផ្ដើមជុំថ្មីទាំងស្រុង ដោយសម្អាតប្រវត្តិអ្នកឈ្នះទាំងអស់មែនទេ?')) {
          resetWheelStudents({ restoreAll: true, clearHistory: true, resetAngle: true });
        }
      });
    }
    if (btnOptResetAngle) {
      btnOptResetAngle.addEventListener('click', () => {
        closeResetModal();
        resetWheelStudents({ restoreAll: false, clearHistory: false, resetAngle: true });
      });
    }

    // Clear All
    btnClearAll.addEventListener('click', () => {
      if (confirm('តើអ្នកពិតជាចង់លុបឈ្មោះសិស្សទាំងអស់មែនទេ?')) {
        students = [];
        masterStudents = [];
        localStorage.setItem('khmer_wheel_user_cleared', 'true');
        saveToStorage();
        updateClassFilterUI();
        renderStudentList();
        checkWheelFinishedState();
        triggerAutoSyncToGoogleSheet('បានលុបសិស្សទាំងអស់');
      }
    });

    // Clear History
    btnClearHistory.addEventListener('click', () => {
      if (confirm('តើអ្នកចង់សម្អាតប្រវត្តិអ្នកឈ្នះទាំងអស់មែនទេ?')) {
        winnerHistory = [];
        currentRound = 1;
        saveToStorage();
        renderHistory();
        triggerAutoSyncToGoogleSheet('បានសម្អាតប្រវត្តិអ្នកឈ្នះទាំងអស់');
      }
    });


    // Settings
    autoRemoveToggle.addEventListener('change', (e) => {
      autoRemove = e.target.checked;
      saveToStorage();
    });

    spinDurationRange.addEventListener('input', (e) => {
      spinDuration = parseInt(e.target.value, 10);
      durationDisplay.textContent = `${spinDuration} វិនាទី`;
      saveToStorage();
    });

    // Font selection events
    if (fontSelect) {
      fontSelect.addEventListener('change', (e) => {
        applyFont(e.target.value);
      });
    }
    if (fontSelectSetting) {
      fontSelectSetting.addEventListener('change', (e) => {
        applyFont(e.target.value);
      });
    }

    // Font size scale buttons
    btnSizes.forEach((btn) => {
      btn.addEventListener('click', () => {
        const size = btn.getAttribute('data-size');
        applyFontScale(size);
      });
    });

    // Winner Modal Actions
    if (btnReplayVoice) {
      btnReplayVoice.addEventListener('click', () => {
        const name = winnerNameDisplay ? winnerNameDisplay.textContent.trim() : '';
        if (name && name !== '-') {
          speakWinner(name, true);
        }
      });
    }
    if (btnSpinAgain) {
      btnSpinAgain.addEventListener('click', () => {
        closeWinnerModal();
        const active = getActiveStudents();
        if (active.length === 0 && masterStudents.length > 0) {
          resetWheelStudents({ restoreAll: true, clearHistory: false, resetAngle: true, silent: true, spinNext: true });
        } else if (active.length > 0) {
          setTimeout(() => {
            spin();
          }, 350);
        }
      });
    }
    btnKeepWinner.addEventListener('click', closeWinnerModal);
    btnCloseModal.addEventListener('click', closeWinnerModal);
    btnRemoveWinner.addEventListener('click', () => {
      if (lastWinningStudent) {
        removeStudent(lastWinningStudent);
      }
      closeWinnerModal();
    });

    // Bulk Modal
    btnBulkModal.addEventListener('click', () => {
      bulkTextarea.value = '';
      bulkModalOverlay.classList.add('active');
    });

    btnCancelBulk.addEventListener('click', () => bulkModalOverlay.classList.remove('active'));
    btnCloseBulk.addEventListener('click', () => bulkModalOverlay.classList.remove('active'));

    btnSaveBulk.addEventListener('click', () => {
      const text = bulkTextarea.value;
      if (text) {
        const lines = text
          .split('\n')
          .map((s) => s.trim())
          .filter((s) => s.length > 0);

        if (lines.length > 0) {
          lines.forEach((line) => {
            const parts = line.split(/[,	]/).map((p) => p.trim());
            const name = parts[0];
            const className = parts[1] || '';
            if (name) {
              const item = { name, className };
              students.push(item);
              if (!masterStudents.some((m) => m.name === name && m.className === className)) {
                masterStudents.push(item);
              }
            }
          });

          saveToStorage();
          updateClassFilterUI();
          renderStudentList();
          checkWheelFinishedState();
          triggerAutoSyncToGoogleSheet('បានបញ្ចូលសិស្សច្រើននាក់');
        }
      }
      bulkModalOverlay.classList.remove('active');
    });

    // ------------------------------------------------------------------------
    // Excel Import Modal Handlers
    // ------------------------------------------------------------------------
    btnExcelModal.addEventListener('click', () => {
      excelFileInput.value = '';
      excelPreviewSection.style.display = 'none';
      btnConfirmImportExcel.disabled = true;
      excelModalOverlay.classList.add('active');
    });

    btnCancelExcel.addEventListener('click', () => excelModalOverlay.classList.remove('active'));
    btnCloseExcel.addEventListener('click', () => excelModalOverlay.classList.remove('active'));

    // Download Sample Template
    btnDownloadSampleExcel.addEventListener('click', downloadSampleExcel);

    // Dropzone Events
    excelDropzone.addEventListener('click', () => excelFileInput.click());

    excelFileInput.addEventListener('change', (e) => {
      if (e.target.files && e.target.files[0]) {
        handleExcelFile(e.target.files[0]);
      }
    });

    excelDropzone.addEventListener('dragover', (e) => {
      e.preventDefault();
      excelDropzone.classList.add('dragover');
    });

    excelDropzone.addEventListener('dragleave', () => {
      excelDropzone.classList.remove('dragover');
    });

    excelDropzone.addEventListener('drop', (e) => {
      e.preventDefault();
      excelDropzone.classList.remove('dragover');
      if (e.dataTransfer.files && e.dataTransfer.files[0]) {
        handleExcelFile(e.dataTransfer.files[0]);
      }
    });

    // Confirm Import from Excel
    btnConfirmImportExcel.addEventListener('click', () => {
      const nameColIdx = parseInt(colNameSelect.value, 10);
      const classColIdx = parseInt(colClassSelect.value, 10);
      const importModeRadio = document.querySelector('input[name="importMode"]:checked');
      const mode = importModeRadio ? importModeRadio.value : 'append';

      if (isNaN(nameColIdx) || nameColIdx < 0) {
        alert('សូមជ្រើសរើសជួរឈរឈ្មោះសិស្ស!');
        return;
      }

      const newItems = [];

      excelRawRows.forEach((row) => {
        const nameVal = row[nameColIdx] !== undefined ? String(row[nameColIdx]).trim() : '';
        const classVal =
          classColIdx >= 0 && row[classColIdx] !== undefined ? String(row[classColIdx]).trim() : '';

        if (nameVal.length > 0) {
          newItems.push({
            name: nameVal,
            className: classVal
          });
        }
      });

      if (newItems.length === 0) {
        alert('មិនមានទិន្នន័យឈ្មោះសិស្សត្រឹមត្រូវសម្រាប់នាំចូលឡើយ!');
        return;
      }

      if (mode === 'replace') {
        students = newItems;
        masterStudents = [...newItems];
      } else {
        students.push(...newItems);
        newItems.forEach((it) => {
          if (!masterStudents.some((m) => m.name === it.name && m.className === it.className)) {
            masterStudents.push(it);
          }
        });
      }

      saveToStorage();
      updateClassFilterUI();
      renderStudentList();
      checkWheelFinishedState();
      excelModalOverlay.classList.remove('active');
      triggerAutoSyncToGoogleSheet('បាននាំចូលសិស្សពី Excel');

      alert(`✅ បាននាំចូលឈ្មោះសិស្សចំនួន ${newItems.length} នាក់ដោយជោគជ័យ!`);
    });

    // Mobile Bottom Nav Item clicks
    mobileNavItems.forEach((btn) => {
      btn.addEventListener('click', () => {
        const targetNav = btn.getAttribute('data-nav');
        setMobileTab(targetNav);
      });
    });

    // Mobile quick jump button back to wheel
    if (btnJumpWheel) {
      btnJumpWheel.addEventListener('click', () => {
        setMobileTab('wheel');
      });
    }

    // ------------------------------------------------------------------------
    // Google Sheets Cloud Sync Handlers
    // ------------------------------------------------------------------------
    if (btnGoogleSheetModal) {
      btnGoogleSheetModal.addEventListener('click', openGoogleSheetModal);
    }
    if (btnOpenSheetModalFromSetting) {
      btnOpenSheetModalFromSetting.addEventListener('click', openGoogleSheetModal);
    }
    if (btnCancelSheetModal) {
      btnCancelSheetModal.addEventListener('click', closeGoogleSheetModal);
    }
    if (btnCloseSheetModal) {
      btnCloseSheetModal.addEventListener('click', closeGoogleSheetModal);
    }

    if (btnSaveSheetUrl) {
      btnSaveSheetUrl.addEventListener('click', () => {
        const val = (googleSheetUrlInput.value || '').trim();
        if (!val) {
          googleSheetUrl = '';
          saveToStorage();
          updateSheetStatusUI();
          alert('បានលុប Web App URL ចេញរួចរាល់!');
          return;
        }
        if (!val.startsWith('https://script.google.com/')) {
          if (!confirm('URL នេះមិនដូចជា Google Apps Script Web App URL ឡើយ។ តើអ្នកពិតជាចង់រក្សាទុកឬ?')) {
            return;
          }
        }
        googleSheetUrl = val;
        saveToStorage();
        updateSheetStatusUI();
        alert('💾 បានរក្សាទុក Google Sheet Web App URL ដោយជោគជ័យ!');
      });
    }

    if (btnPushToSheet) {
      btnPushToSheet.addEventListener('click', pushToGoogleSheet);
    }

    if (btnPullFromSheet) {
      btnPullFromSheet.addEventListener('click', () => pullFromGoogleSheet(false));
    }

    if (btnCopyShareLink) {
      btnCopyShareLink.addEventListener('click', copyShareLink);
    }

    if (btnToggleScriptGuide) {
      btnToggleScriptGuide.addEventListener('click', () => {
        if (!scriptGuideBox) return;
        const isHidden = scriptGuideBox.style.display === 'none' || !scriptGuideBox.style.display;
        scriptGuideBox.style.display = isHidden ? 'block' : 'none';
        if (isHidden && appsScriptCodePreview) {
          appsScriptCodePreview.textContent = GOOGLE_APPS_SCRIPT_CODE;
        }
      });
    }

    if (btnCopyAppsScriptCode) {
      btnCopyAppsScriptCode.addEventListener('click', copyAppsScriptCode);
    }

    // Quick Connect & Paste to Connect Handlers
    if (btnPasteAndConnect) {
      btnPasteAndConnect.addEventListener('click', async () => {
        let clipText = '';
        if (navigator.clipboard && navigator.clipboard.readText) {
          try {
            clipText = await navigator.clipboard.readText();
          } catch (e) {
            console.warn('Clipboard read permission/error:', e);
          }
        }

        const url = (clipText && clipText.startsWith('https://script.google.com/'))
          ? clipText.trim()
          : (googleSheetUrlInput && googleSheetUrlInput.value.trim()
              ? googleSheetUrlInput.value.trim()
              : DEFAULT_GOOGLE_SHEET_URL);

        await connectAndSyncGoogleSheetUrl(url, true);
      });
    }

    if (btnConnectPresetUrl) {
      btnConnectPresetUrl.addEventListener('click', async () => {
        await connectAndSyncGoogleSheetUrl(DEFAULT_GOOGLE_SHEET_URL, true);
      });
    }

    if (btnQuickConnectSettings) {
      btnQuickConnectSettings.addEventListener('click', async () => {
        await connectAndSyncGoogleSheetUrl(DEFAULT_GOOGLE_SHEET_URL, true);
      });
    }

    const copyUrlHandler = () => {
      const urlToCopy = (googleSheetUrlInput && googleSheetUrlInput.value.trim()) || DEFAULT_GOOGLE_SHEET_URL;
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(urlToCopy).then(() => {
          showToast('📋 បានចម្លង Web App URL ទៅកាន់ Clipboard រួចរាល់!', '✅');
        }).catch(() => fallbackCopy(urlToCopy));
      } else {
        fallbackCopy(urlToCopy);
      }
    };

    if (btnCopyWebAppUrl) {
      btnCopyWebAppUrl.addEventListener('click', copyUrlHandler);
    }
    if (btnCopyPresetUrl) {
      btnCopyPresetUrl.addEventListener('click', copyUrlHandler);
    }

    // Edit Student Modal Handlers
    if (btnSaveEditStudent) {
      btnSaveEditStudent.addEventListener('click', saveEditedStudent);
    }
    if (btnCancelEditStudent) {
      btnCancelEditStudent.addEventListener('click', closeEditStudentModal);
    }
    if (btnCloseEditStudent) {
      btnCloseEditStudent.addEventListener('click', closeEditStudentModal);
    }
    if (editStudentNameInput) {
      editStudentNameInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') saveEditedStudent();
      });
    }
    if (editStudentClassInput) {
      editStudentClassInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') saveEditedStudent();
      });
    }

    // Theme Events
    if (btnOpenThemePickerTop) {
      btnOpenThemePickerTop.addEventListener('click', openThemeModal);
    }
    if (btnOpenThemeModalFromSettings) {
      btnOpenThemeModalFromSettings.addEventListener('click', openThemeModal);
    }
    if (btnCloseThemeModal) {
      btnCloseThemeModal.addEventListener('click', closeThemeModal);
    }
    if (btnCancelThemeModal) {
      btnCancelThemeModal.addEventListener('click', closeThemeModal);
    }

    if (themeSearchInput) {
      themeSearchInput.addEventListener('input', (e) => {
        currentThemeSearchTerm = e.target.value;
        if (btnClearThemeSearch) {
          btnClearThemeSearch.style.display = currentThemeSearchTerm ? 'inline-block' : 'none';
        }
        renderThemeCards(currentThemeCategoryFilter, currentThemeSearchTerm);
      });
    }

    if (btnClearThemeSearch) {
      btnClearThemeSearch.addEventListener('click', () => {
        currentThemeSearchTerm = '';
        if (themeSearchInput) themeSearchInput.value = '';
        btnClearThemeSearch.style.display = 'none';
        renderThemeCards(currentThemeCategoryFilter, '');
        if (themeSearchInput) themeSearchInput.focus();
      });
    }

    if (themeCategoryPills) {
      themeCategoryPills.addEventListener('click', (e) => {
        const btn = e.target.closest('.theme-cat-btn');
        if (!btn) return;
        themeCategoryPills.querySelectorAll('.theme-cat-btn').forEach((b) => b.classList.remove('active'));
        btn.classList.add('active');
        currentThemeCategoryFilter = btn.dataset.cat || 'all';
        renderThemeCards(currentThemeCategoryFilter, currentThemeSearchTerm);
      });
    }

    // Close modals on overlay background click
    [excelModalOverlay, bulkModalOverlay, winnerModalOverlay, googleSheetModalOverlay, editStudentModalOverlay, resetModalOverlay, themeModalOverlay].forEach((overlay) => {
      if (overlay) {
        overlay.addEventListener('click', (e) => {
          if (e.target === overlay) {
            overlay.classList.remove('active');
            if (overlay === winnerModalOverlay) stopConfetti();
          }
        });
      }
    });

    // Keyboard Shortcuts (Escape to close modal, Spacebar to spin, R to reset)
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        if (winnerModalOverlay && winnerModalOverlay.classList.contains('active')) closeWinnerModal();
        if (excelModalOverlay && excelModalOverlay.classList.contains('active'))
          excelModalOverlay.classList.remove('active');
        if (bulkModalOverlay && bulkModalOverlay.classList.contains('active'))
          bulkModalOverlay.classList.remove('active');
        if (googleSheetModalOverlay && googleSheetModalOverlay.classList.contains('active'))
          closeGoogleSheetModal();
        if (editStudentModalOverlay && editStudentModalOverlay.classList.contains('active'))
          closeEditStudentModal();
        if (resetModalOverlay && resetModalOverlay.classList.contains('active'))
          closeResetModal();
        if (themeModalOverlay && themeModalOverlay.classList.contains('active'))
          closeThemeModal();
      } else if ((e.key === 'r' || e.key === 'R') && !e.ctrlKey && !e.altKey && !e.metaKey) {
        const tag = document.activeElement ? document.activeElement.tagName.toLowerCase() : '';
        if (tag !== 'input' && tag !== 'textarea' && tag !== 'select') {
          e.preventDefault();
          openResetModal();
        }
      } else if (e.code === 'Space' || e.key === ' ') {
        const tag = document.activeElement ? document.activeElement.tagName.toLowerCase() : '';
        if (tag !== 'input' && tag !== 'textarea' && tag !== 'select') {
          e.preventDefault();
          spin();
        }
      }
    });

    // Resize handling for Canvas & Mobile Layout
    window.addEventListener('resize', () => {
      if (displayViewMode === 'auto') {
        if (isMobileLayoutActive()) {
          setMobileTab(currentMobileTab || 'wheel');
        } else {
          if (wheelSection) wheelSection.style.display = '';
          if (sidePanel) sidePanel.style.display = '';
        }
      }
      setupHiDPICanvas();
      drawWheel();
      resizeConfetti();
    });
  }

  // --------------------------------------------------------------------------
  // Google Sheets Cloud Sync Operations
  // --------------------------------------------------------------------------
  function openGoogleSheetModal() {
    if (!googleSheetModalOverlay) return;
    if (googleSheetUrlInput) {
      googleSheetUrlInput.value = googleSheetUrl || DEFAULT_GOOGLE_SHEET_URL;
    }
    if (appsScriptCodePreview) {
      appsScriptCodePreview.textContent = GOOGLE_APPS_SCRIPT_CODE;
    }
    updateSheetStatusUI();
    googleSheetModalOverlay.classList.add('active');
  }

  function closeGoogleSheetModal() {
    if (!googleSheetModalOverlay) return;
    googleSheetModalOverlay.classList.remove('active');
  }

  async function connectAndSyncGoogleSheetUrl(urlToConnect, showSuccessAlert = true) {
    const url = (urlToConnect || '').trim();
    if (!url) {
      alert('សូមបញ្ចូល ឬបិទភ្ជាប់ Google Apps Script Web App URL ជាមុនសិន!');
      return false;
    }
    if (!url.startsWith('https://script.google.com/')) {
      if (!confirm('URL នេះមិនដូចជា Google Apps Script Web App URL ឡើយ។ តើអ្នកពិតជាចង់ភ្ជាប់ឬ?')) {
        return false;
      }
    }

    googleSheetUrl = url;
    if (googleSheetUrlInput) {
      googleSheetUrlInput.value = url;
    }
    saveToStorage();
    updateSheetStatusUI();

    showToast('🔗 បានភ្ជាប់ Google Apps Script Web App! កំពុងទាញយកទិន្នន័យ...', '☁️');

    // Automatically pull data from Google Sheet
    await pullFromGoogleSheet(!showSuccessAlert);
    return true;
  }

  function updateSheetStatusUI() {
    const hasUrl = !!googleSheetUrl;
    if (sheetStatusDot) {
      sheetStatusDot.textContent = hasUrl ? '🟢' : '⚪';
    }
    if (sheetStatusText) {
      sheetStatusText.textContent = hasUrl ? 'បានភ្ជាប់ជាមួយ Google Sheet រួចរាល់' : 'មិនទាន់បានភ្ជាប់ជាមួយ Google Sheet ឡើយ';
    }
    if (sheetStatusSub) {
      if (hasUrl) {
        sheetStatusSub.textContent = googleSheetUrl.substring(0, 48) + '...';
      } else {
        sheetStatusSub.textContent = 'សូមបិទភ្ជាប់ Google Web App URL ខាងក្រោមដើម្បីចាប់ផ្តើម';
      }
    }
    if (sheetLastSyncText) {
      sheetLastSyncText.textContent = lastSheetSyncTime ? `សមកាលកម្មចុងក្រោយ៖ ${lastSheetSyncTime}` : '-';
    }
    if (cloudStatusIndicatorSettings) {
      cloudStatusIndicatorSettings.textContent = hasUrl ? '🟢 បានភ្ជាប់' : '⚪ មិនទាន់ភ្ជាប់';
      cloudStatusIndicatorSettings.className = hasUrl ? 'cloud-status-badge text-sheets' : 'cloud-status-badge';
    }
  }

  async function pushToGoogleSheet(silent = false) {
    if (!googleSheetUrl) {
      if (!silent) {
        alert('សូមបញ្ចូល និងរក្សាទុក Google Apps Script Web App URL ជាមុនសិន!');
        if (googleSheetUrlInput) googleSheetUrlInput.focus();
      }
      return;
    }

    if (isSheetSyncing) return;
    isSheetSyncing = true;
    if (btnPushToSheet) {
      btnPushToSheet.disabled = true;
      btnPushToSheet.style.opacity = '0.6';
    }

    if (cloudSyncBanner) {
      cloudSyncBanner.style.display = 'block';
      if (syncBannerIcon) syncBannerIcon.className = 'sync-spinner';
      if (syncBannerText) syncBannerText.textContent = 'កំពុងរក្សាទុកទិន្នន័យទៅ Google Sheets...';
    }

    // Ensure masterStudents contains all known students and history records
    syncMasterStudentsWithHistory();

    const activeSet = new Set(
      students.map((s) => {
        const norm = normalizeStudent(s);
        return `${norm.name}:::${norm.className}`;
      })
    );

    const payload = {
      action: 'push',
      // Always send all master students so Google Sheet NEVER loses removed/drawn students
      students: masterStudents.map((m) => {
        const norm = normalizeStudent(m);
        const isActive = activeSet.has(`${norm.name}:::${norm.className}`);
        return {
          name: norm.name,
          className: norm.className,
          status: isActive ? 'នៅក្នុងកងវិល' : 'បានដកចេញ/ឈ្នះ'
        };
      }),
      activeCount: students.length,
      masterCount: masterStudents.length,
      history: winnerHistory,
      exportedAt: new Date().toISOString()
    };

    try {
      // Use text/plain to avoid CORS preflight OPTIONS request
      const response = await fetch(googleSheetUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'text/plain;charset=utf-8'
        },
        body: JSON.stringify(payload)
      });

      const resText = await response.text();
      let resJson;
      try {
        resJson = JSON.parse(resText);
      } catch (e) {
        resJson = { status: 'success', message: resText };
      }

      lastSheetSyncTime = new Date().toLocaleTimeString('km-KH');
      saveToStorage();
      updateSheetStatusUI();

      if (cloudSyncBanner) {
        if (syncBannerIcon) syncBannerIcon.className = '';
        if (syncBannerText) syncBannerText.textContent = `✅ បានធ្វើសមកាលកម្មទិន្នន័យ ${payload.students.length} នាក់ទៅ Google Sheets រួចរាល់`;
        setTimeout(() => {
          if (cloudSyncBanner) cloudSyncBanner.style.display = 'none';
        }, 3500);
      }

      if (!silent) {
        alert(`✅ បញ្ជូនទិន្នន័យសិស្ស ${payload.students.length} នាក់ និងប្រវត្តិទៅ Google Sheet បានដោយជោគជ័យ!`);
      }
    } catch (err) {
      console.error('Google Sheet Push Error:', err);
      if (cloudSyncBanner) {
        if (syncBannerIcon) syncBannerIcon.className = '';
        if (syncBannerText) syncBannerText.textContent = '⚠️ មិនអាចបញ្ជូនទិន្នន័យទៅ Google Sheets ឡើយ';
        setTimeout(() => {
          if (cloudSyncBanner) cloudSyncBanner.style.display = 'none';
        }, 5000);
      }
      if (!silent) {
        alert('❌ មិនអាចបញ្ជូនទិន្នន័យទៅកាន់ Google Sheet បានទេ!\nសូមពិនិត្យមើល URL និងការកំណត់ Web App (Who has access: Anyone) ឡើងវិញ។\n' + err.message);
      }
    } finally {
      isSheetSyncing = false;
      if (btnPushToSheet) {
        btnPushToSheet.disabled = false;
        btnPushToSheet.style.opacity = '1';
      }
    }
  }

  let autoSyncDebounceTimer = null;

  function triggerAutoSyncToGoogleSheet(actionDesc) {
    if (!googleSheetUrl || !googleSheetUrl.startsWith('https://script.google.com/')) {
      return;
    }

    if (autoSyncDebounceTimer) {
      clearTimeout(autoSyncDebounceTimer);
    }

    if (cloudSyncBanner) {
      cloudSyncBanner.style.display = 'block';
      if (syncBannerIcon) syncBannerIcon.className = 'sync-spinner';
      if (syncBannerText) {
        syncBannerText.textContent = actionDesc 
          ? `🔄 ${actionDesc}... កំពុងបញ្ជូនទៅ Google Sheets...` 
          : '🔄 កំពុងធ្វើសមកាលកម្មទិន្នន័យទៅ Google Sheets ដោយស្វ័យប្រវត្តិ...';
      }
    }

    autoSyncDebounceTimer = setTimeout(() => {
      pushToGoogleSheet(true);
    }, 1000);
  }


  async function pullFromGoogleSheet(silent = false) {
    if (!googleSheetUrl) {
      if (!silent) {
        alert('សូមបញ្ចូល និងរក្សាទុក Google Apps Script Web App URL ជាមុនសិន!');
        if (googleSheetUrlInput) googleSheetUrlInput.focus();
      }
      return;
    }

    if (isSheetSyncing) return;
    isSheetSyncing = true;
    if (btnPullFromSheet) {
      btnPullFromSheet.disabled = true;
      btnPullFromSheet.style.opacity = '0.6';
    }

    // Show sync banner
    if (cloudSyncBanner) {
      cloudSyncBanner.style.display = 'block';
      if (syncBannerIcon) syncBannerIcon.className = 'sync-spinner';
      if (syncBannerText) syncBannerText.textContent = 'កំពុងទាញយកទិន្នន័យពី Google Sheets ដោយស្វ័យប្រវត្តិ...';
    }

    try {
      // Append cache buster
      const fetchUrl = googleSheetUrl + (googleSheetUrl.includes('?') ? '&' : '?') + 't=' + Date.now();
      const response = await fetch(fetchUrl);
      const data = await response.json();

      if (data && data.status === 'success' && Array.isArray(data.students)) {
        masterStudents = data.students.map(normalizeStudent);

        if (Array.isArray(data.history) && data.history.length > 0) {
          winnerHistory = data.history;
          currentRound = winnerHistory.length + 1;
        }

        // ពេលចូលប្រព័ន្ធ ឬទាញយកពី Google Sheet គឺដាក់សិស្សទាំងអស់លើកងវិល (កុំដកឈ្មោះសិស្សពីកង)
        students = masterStudents.map(normalizeStudent);

        lastSheetSyncTime = new Date().toLocaleTimeString('km-KH');
        saveToStorage();
        updateClassFilterUI();
        renderStudentList();
        renderHistory();
        drawWheel();
        checkWheelFinishedState();
        updateSheetStatusUI();

        if (cloudSyncBanner) {
          if (syncBannerIcon) syncBannerIcon.className = '';
          if (syncBannerText) syncBannerText.textContent = `✅ បានធ្វើសមកាលកម្មទិន្នន័យសិស្ស ${students.length} នាក់ពី Google Sheets រួចរាល់`;
          setTimeout(() => {
            if (cloudSyncBanner) cloudSyncBanner.style.display = 'none';
          }, 4000);
        }

        if (!silent) {
          alert(`✅ ទាញយកទិន្នន័យសិស្ស ${students.length} នាក់ពី Google Sheet បានជោគជ័យ!`);
        }
      } else {
        throw new Error((data && data.message) || 'ទម្រង់ទិន្នន័យមិនត្រឹមត្រូវ');
      }
    } catch (err) {
      console.error('Google Sheet Pull Error:', err);
      if (cloudSyncBanner) {
        if (syncBannerIcon) syncBannerIcon.className = '';
        if (syncBannerText) syncBannerText.textContent = '⚠️ មិនអាចទាញយកទិន្នន័យពី Google Sheets ឡើយ';
        setTimeout(() => {
          if (cloudSyncBanner) cloudSyncBanner.style.display = 'none';
        }, 5000);
      }
      if (!silent) {
        alert('❌ មិនអាចទាញយកទិន្នន័យពី Google Sheet បានទេ!\n' + err.message);
      }
    } finally {
      isSheetSyncing = false;
      if (btnPullFromSheet) {
        btnPullFromSheet.disabled = false;
        btnPullFromSheet.style.opacity = '1';
      }
    }
  }

  function copyShareLink() {
    if (!googleSheetUrl) {
      alert('សូមបញ្ចូល និងរក្សាទុក Google Apps Script Web App URL ជាមុនសិន ទើបអាចបង្កើត Link ចែករំលែកបាន!');
      return;
    }

    try {
      const url = new URL(window.location.href);
      url.searchParams.set('sheet', googleSheetUrl);
      const shareUrl = url.toString();

      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(shareUrl).then(() => {
          alert('🔗 បានចម្លង Link ចែករំលែករួចរាល់!\nអ្នកអាចផ្ញើ Link នេះទៅកាន់ទូរស័ព្ទដៃ ឬកុំព្យូទ័រដទៃទៀត ដើម្បីបើក និងទាញយកទិន្នន័យភ្លាមៗ។');
        }).catch(() => fallbackCopy(shareUrl));
      } else {
        fallbackCopy(shareUrl);
      }
    } catch (e) {
      alert('កំហុសក្នុងការបង្កើត Link: ' + e.message);
    }
  }

  function copyAppsScriptCode() {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(GOOGLE_APPS_SCRIPT_CODE).then(() => {
        alert('📋 បានចម្លងកូដ Google Apps Script (Code.gs) រួចរាល់!\nសូមចូលទៅកាន់ Google Sheet > Extensions > Apps Script រួច Paste កូដនេះចូល។');
      }).catch(() => fallbackCopy(GOOGLE_APPS_SCRIPT_CODE));
    } else {
      fallbackCopy(GOOGLE_APPS_SCRIPT_CODE);
    }
  }

  function fallbackCopy(text) {
    const tempInput = document.createElement('textarea');
    tempInput.value = text;
    tempInput.style.position = 'fixed';
    tempInput.style.left = '-9999px';
    document.body.appendChild(tempInput);
    tempInput.select();
    try {
      document.execCommand('copy');
      alert('📋 បានចម្លងរួចរាល់!');
    } catch (err) {
      prompt('សូមចម្លងអត្ថបទខាងក្រោមដោយដៃ៖', text);
    }
    document.body.removeChild(tempInput);
  }

  // Auto-connect and load if URL has ?sheet= parameter from cross-device sharing
  function checkUrlShareParams() {
    try {
      const urlParams = new URLSearchParams(window.location.search);
      const sharedSheet = urlParams.get('sheet');
      if (sharedSheet && sharedSheet.startsWith('https://script.google.com/')) {
        googleSheetUrl = sharedSheet;
        if (googleSheetUrlInput) googleSheetUrlInput.value = sharedSheet;
        saveToStorage();
        updateSheetStatusUI();
        return true;
      }
    } catch (e) {
      console.warn('URL params parse error:', e);
    }
    return false;
  }

  // --------------------------------------------------------------------------
  // Application Entry Point
  // --------------------------------------------------------------------------
  function init() {
    loadFromStorage();
    initTabs();
    initConfetti();
    setupHiDPICanvas();
    setupEvents();

    // Sync UI with settings
    autoRemoveToggle.checked = autoRemove;
    soundSettingToggle.checked = soundEnabled;
    soundIcon.textContent = soundEnabled ? '🔊' : '🔇';
    spinDurationRange.value = spinDuration;
    durationDisplay.textContent = `${spinDuration} វិនាទី`;

    // Apply saved or default font, font size, and display view mode
    applyFont(selectedFont);
    applyFontScale(wheelFontScale);
    applyViewMode(displayViewMode);

    // Apply saved or default system theme (35 styles)
    applyTheme(currentTheme, false);
    populateThemeSettingsDropdown();
    renderThemeCards(currentThemeCategoryFilter, currentThemeSearchTerm);

    updateClassFilterUI();
    renderStudentList();
    renderHistory();
    updateSheetStatusUI();

    // Check cross-device shared link query params
    const hasSharedSheet = checkUrlShareParams();

    // ពេលចូលប្រព័ន្ធទិន្នន័យទាញយកពី Google Sheet auto
    // ប្រសិនបើមាន Google Sheet URL (ពីការរក្សាទុកពីមុន ឬពី Share Link) ទាញយកដោយស្វ័យប្រវត្តិ
    if (googleSheetUrl && googleSheetUrl.startsWith('https://script.google.com/')) {
      pullFromGoogleSheet(true);
    }

    // Ensure Khmer fonts are loaded before initial canvas draw
    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(() => {
        drawWheel();
      });
    }

    // Unlock Web Audio context on first user touch/click
    document.addEventListener('pointerdown', initAudio, { once: true });

    // Pre-load speech synthesis voices
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.getVoices();
      if (window.speechSynthesis.onvoiceschanged !== undefined) {
        window.speechSynthesis.onvoiceschanged = () => {
          try {
            window.speechSynthesis.getVoices();
          } catch (e) {}
        };
      }
    }
  }

  // Run on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
