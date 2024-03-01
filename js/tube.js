const btnContainer = document.getElementById('btn-container');
const cardContainer =document.getElementById('card-container');

const loadCategories = async () => {
    const res = await fetch('https://openapi.programming-hero.com/api/videos/categories');
    const data = await res.json();
    // console.log(data.data);
    data.data.forEach(item => {
        // console.log(item);
        const newBtn = document.createElement('button');
        newBtn.className = 'btn btn-ghost bg-slate-700 text-white text-lg';
        newBtn.innerText = item.category;
        newBtn.addEventListener('click', () => loadDataByCategories(item.category_id))
        btnContainer.appendChild(newBtn);
    });
}

const loadDataByCategories = async (categoryId) => {
    // console.log(categoryId);
    const res = await fetch(`https://openapi.programming-hero.com/api/videos/category/${categoryId}`);
    const data = await res.json();
    // console.log(data);
    data.data.forEach(video => {
        // console.log(video);
        const newCard = document.createElement('div');
    })
}



loadCategories();