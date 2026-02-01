# Favorites & Recommendations Feature - Testing Guide

## Feature Overview

The Recipe Sharing Application now includes two new features:
1. **Favorites System** - Users can mark recipes as favorites
2. **Smart Recommendations** - Personalized recipe suggestions based on favorites

## Testing Favorites Feature

### Test Case 1: Add Recipe to Favorites
**Objective:** Verify that users can add a recipe to favorites

**Steps:**
1. Add a recipe (e.g., "Pasta Carbonara") with ingredients: [bacon, eggs, pasta, parmesan]
2. In the recipe list, click "Add to Favorites" button
3. **Expected Result:**
   - Button text changes to "Favorited"
   - Button background changes from gray (#e0e0e0) to red (#ff6b6b)
   - Heart emoji changes from 🤍 (white) to ❤️ (red)
   - Button shows hover/scale animation

### Test Case 2: Remove Recipe from Favorites
**Objective:** Verify that users can remove a recipe from favorites

**Steps:**
1. Click the "Favorited" button on a favorited recipe
2. **Expected Result:**
   - Button text changes back to "Add to Favorites"
   - Button background changes from red to gray
   - Heart emoji changes from ❤️ to 🤍
   - Recipe is removed from favorites

### Test Case 3: Toggle Favorite Multiple Times
**Objective:** Verify the toggle functionality is stable

**Steps:**
1. Add 3 recipes to the app
2. Click favorite button multiple times on each recipe (add, remove, add, remove)
3. **Expected Result:**
   - State toggles correctly each time
   - UI updates immediately
   - No errors in browser console

### Test Case 4: Favorite State Persistence
**Objective:** Verify favorites persist across navigation

**Steps:**
1. Add 2 recipes
2. Mark first recipe as favorite
3. Navigate to recipe details page for second recipe
4. Navigate back to home
5. **Expected Result:**
   - First recipe still shows as "Favorited"
   - Favorite button remains accurate

## Testing Recommendations Feature

### Test Case 5: No Recommendations Without Favorites
**Objective:** Verify recommendations section doesn't show when no favorites exist

**Steps:**
1. Fresh app with no recipes in favorites
2. Add 3-4 recipes
3. **Expected Result:**
   - Recommendations section is NOT visible
   - No "✨ Recommended For You" header appears

### Test Case 6: Recommendations Appear After Adding Favorites
**Objective:** Verify recommendations show up once favorites are added

**Steps:**
1. Add these test recipes:
   - Recipe 1: "Chocolate Cake" - Ingredients: [flour, sugar, chocolate, eggs, butter]
   - Recipe 2: "Chocolate Brownies" - Ingredients: [flour, sugar, chocolate, eggs, oil]
   - Recipe 3: "Vanilla Cake" - Ingredients: [flour, sugar, eggs, butter, vanilla]
   - Recipe 4: "Pizza" - Ingredients: [dough, tomato, cheese, basil]

2. Mark Recipe 1 (Chocolate Cake) as favorite
3. **Expected Result:**
   - "✨ Recommended For You" section appears
   - Shows up to 3 recommended recipes
   - Recommendations should prioritize recipes with shared ingredients (Brownies should be recommended)

### Test Case 7: Recommendation Quality
**Objective:** Verify recommendations are based on shared ingredients

**Steps:**
1. Add these recipes:
   - "Spaghetti Carbonara" - Ingredients: [pasta, bacon, eggs, parmesan, pepper]
   - "Egg Fried Rice" - Ingredients: [rice, eggs, soy sauce, vegetables, sesame oil]
   - "Caesar Salad" - Ingredients: [lettuce, parmesan, croutons, dressing]
   - "Mushroom Risotto" - Ingredients: [rice, mushrooms, broth, parmesan, butter]
   - "Steak" - Ingredients: [beef, salt, pepper, butter]

2. Mark "Spaghetti Carbonara" as favorite
3. **Expected Result:**
   - Recommendations should rank egg-based dishes higher (Egg Fried Rice)
   - Parmesan-based recipes should rank well (Caesar Salad, Risotto)
   - Steak should rank lower (no shared key ingredients)

### Test Case 8: Recommendations Update on New Favorite
**Objective:** Verify recommendations refresh when user adds new favorites

**Steps:**
1. Use recipes from Test Case 7
2. Mark "Spaghetti Carbonara" as favorite - observe recommendations
3. Mark "Egg Fried Rice" as additional favorite
4. **Expected Result:**
   - Recommendations update immediately
   - Prioritize recipes with ingredients matching BOTH favorites
   - Different recipes appear if they match new favorite patterns

### Test Case 9: Remove Favorite and Recommendations Update
**Objective:** Verify recommendations adapt when removing favorites

**Steps:**
1. Have 2-3 recipes marked as favorites
2. View recommendations
3. Remove one favorite
4. **Expected Result:**
   - Recommendations update immediately
   - Adjusted based on remaining favorites
   - Recommendations section may hide if no favorites remain

### Test Case 10: Multiple Favorites with Diverse Ingredients
**Objective:** Test recommendation algorithm with complex ingredient overlaps

**Steps:**
1. Add recipes with varied ingredients:
   - Asian Noodles - Ingredients: [noodles, soy sauce, ginger, garlic, sesame oil]
   - Thai Curry - Ingredients: [curry paste, coconut milk, ginger, garlic, rice]
   - Garlic Bread - Ingredients: [bread, garlic, butter, parmesan]
   - Garlic Rice - Ingredients: [rice, garlic, oil, salt]

2. Mark Asian Noodles and Thai Curry as favorites
3. **Expected Result:**
   - Recommendations prioritize recipes with garlic, ginger, or rice
   - Algorithm properly scores based on ingredient overlap
   - Garlic Rice should rank highest (rice + garlic overlap with both favorites)

## UI/UX Testing for Favorites & Recommendations

### Test Case 11: Favorite Button Styling
**Objective:** Verify favorite button has proper visual feedback

**Steps:**
1. Look at favorite button in recipe list
2. Hover over button
3. Click button
4. **Expected Result:**
   - Hover: Button scales up (1.05x) and shows shadow
   - Click: Button state changes smoothly
   - Transitions are smooth (0.3s)
   - Colors change appropriately

### Test Case 12: Recommendations Card Design
**Objective:** Verify recommendation cards are visually appealing

**Steps:**
1. View recommendations section
2. Hover over individual recommendation cards
3. **Expected Result:**
   - Cards have pink/red border (#ff6b6b)
   - Light pink background (#fff9f9)
   - Hover: Card lifts up (translateY -4px) with shadow
   - Ingredients shown as pink tags
   - "View Recipe" button is red with hover effect
   - Heart button available to add to favorites

### Test Case 13: Responsive Design - Recommendations Grid
**Objective:** Verify recommendations display well on different screen sizes

**Steps:**
1. View recommendations on desktop (1200px+)
2. Resize browser to tablet size (768px)
3. Resize browser to mobile size (375px)
4. **Expected Result:**
   - Desktop: 3+ cards in a row
   - Tablet: 2 cards in a row
   - Mobile: 1 card per row
   - All content remains readable and clickable

### Test Case 14: Empty Recommendations Label
**Objective:** Verify appropriate messaging when no favorites exist

**Steps:**
1. Start fresh app with no favorites
2. Look for recommendations section
3. **Expected Result:**
   - No "Recommended For You" section visible
   - No empty state message cluttering the UI

## Integration Testing

### Test Case 15: Favorite + Search Integration
**Objective:** Verify favorites work correctly with search functionality

**Steps:**
1. Add 5 recipes with varied ingredients
2. Mark some as favorites
3. Search for a recipe keyword
4. **Expected Result:**
   - Favorite buttons still work in filtered results
   - Can favorite/unfavorite filtered recipes
   - Recommendations still update based on all favorites (not just filtered)

### Test Case 16: Favorite + Edit Integration
**Objective:** Verify favorites remain consistent when editing recipes

**Steps:**
1. Add a recipe "Pasta"
2. Mark as favorite
3. Edit the recipe name to "Spaghetti Pasta"
4. **Expected Result:**
   - Recipe remains in favorites
   - Favorite button still shows as "Favorited"
   - Recommendations update based on edited recipe content

### Test Case 17: Favorite + Delete Integration
**Objective:** Verify deleting a favorited recipe

**Steps:**
1. Add recipe "Risotto"
2. Mark as favorite
3. Navigate to recipe details
4. Delete the recipe
5. **Expected Result:**
   - Recipe is deleted
   - No errors occur
   - Recommendations update (removed from future recommendations)
   - Favorite list updates

### Test Case 18: Add Recipe After Favorites Set
**Objective:** Verify new recipes can be recommended

**Steps:**
1. Add Recipe A, B, C and mark A as favorite
2. View recommendations
3. Add new Recipe D with similar ingredients to A
4. **Expected Result:**
   - Recommendations update
   - Recipe D appears in recommendations
   - Algorithm includes newly added recipes

## Edge Cases & Error Handling

### Test Case 19: Maximum Favorites
**Objective:** Verify system handles many favorites gracefully

**Steps:**
1. Mark 20+ recipes as favorites
2. View recommendations
3. **Expected Result:**
   - Recommendations still generate correctly
   - Top 3 most relevant recipes shown
   - No performance degradation
   - No console errors

### Test Case 20: Favorite Button Spam Clicking
**Objective:** Verify rapid clicking doesn't break the system

**Steps:**
1. Rapidly click favorite button (10+ times quickly)
2. **Expected Result:**
   - State updates correctly
   - No duplicate entries in favorites array
   - UI reflects final state correctly
   - No console errors

### Test Case 21: Empty Ingredients Recommendation
**Objective:** Verify system handles recipes without ingredients

**Steps:**
1. Add Recipe A with ingredients
2. Add Recipe B without ingredients
3. Mark Recipe A as favorite
4. **Expected Result:**
   - Recommendation algorithm doesn't crash
   - Handles null/undefined gracefully
   - Recipe B might appear in recommendations (random selection)

### Test Case 22: Search Term in Recommendation
**Objective:** Verify user can search from recommendations

**Steps:**
1. View recommendations
2. Click "View Recipe" on recommended recipe
3. **Expected Result:**
   - Navigation to recipe details works
   - Can edit, delete, or return to home
   - Favorite status maintained

## Performance Testing

### Test Case 23: Recommendation Generation Performance
**Objective:** Verify recommendations generate quickly

**Steps:**
1. Add 50+ recipes
2. Mark 10+ as favorites
3. Measure time for recommendations to appear
4. **Expected Result:**
   - Recommendations appear within 100ms
   - No visible UI lag
   - Smooth animations

### Test Case 24: Memory Usage with Many Favorites
**Objective:** Verify no memory leaks with extensive use

**Steps:**
1. Add 100+ recipes
2. Toggle favorites rapidly for 5 minutes
3. Check browser DevTools memory usage
4. **Expected Result:**
   - Memory usage remains stable
   - No memory leak pattern
   - Browser remains responsive

## Browser Compatibility

Test all features in:
- ✅ Chrome/Edge (latest)
- ✅ Firefox (latest)
- ✅ Safari (if available)

## Accessibility Testing

### Test Case 25: Keyboard Navigation for Favorites
**Objective:** Verify favorites are keyboard accessible

**Steps:**
1. Use Tab to navigate to favorite buttons
2. Press Enter/Space to toggle
3. **Expected Result:**
   - Buttons receive focus
   - Focus ring visible
   - Click state triggers on Enter

## Success Criteria

All test cases should pass:
- ✅ Favorites can be added/removed
- ✅ Recommendations generate based on favorites
- ✅ UI updates in real-time
- ✅ No console errors
- ✅ Smooth animations and transitions
- ✅ Integration with search, edit, delete works
- ✅ Performance is optimal
- ✅ Responsive on all screen sizes
- ✅ Accessible via keyboard

## Regression Testing Checklist

Before deployment, verify that previous features still work:
- ✅ Add Recipe functionality
- ✅ Search and Filter
- ✅ Recipe Details view
- ✅ Edit Recipe
- ✅ Delete Recipe
- ✅ No recipes message
- ✅ Empty search results message
