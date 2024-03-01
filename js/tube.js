const btnContainer = document.getElementById('btn-container');
const cardContainer = document.getElementById('card-container');
const errorElement = document.getElementById('error-element');

let displayCategory = 1000;

const loadCategories = async () => {
    const res = await fetch('https://openapi.programming-hero.com/api/videos/categories');
    const data = await res.json();
    // console.log(data.data);
    data.data.forEach(item => {
        // console.log(item);
        const newBtn = document.createElement('button');
        newBtn.className = 'category-btn btn btn-ghost bg-slate-700 text-white text-lg hover:bg-red-400';
        newBtn.innerText = item.category;
        newBtn.addEventListener('click', () => {
            loadDataByCategories(item.category_id);
            const allButton = document.querySelectorAll('.category-btn');
            for(const button of allButton){
                button.classList.remove('bg-red-600');
            }
            newBtn.classList.add('bg-red-600');
        })
        btnContainer.appendChild(newBtn);
    });
}

const loadDataByCategories = async (categoryId) => {
    // console.log(categoryId);
    displayCategory = categoryId;
    const res = await fetch(`https://openapi.programming-hero.com/api/videos/category/${categoryId}`);
    const data = await res.json();

    if (data.data.length === 0) {
        errorElement.classList.remove('hidden');
    }
    else {
        errorElement.classList.add('hidden');
    }

    cardContainer.innerHTML = '';
    data.data.forEach(video => {
        console.log(video);
        let verifiedBadge = '';

        if (video.authors[0].verified) {
            verifiedBadge = `<img class="w-6 h-6" src="./images/verified.png" alt="">`;
        }

        const newCard = document.createElement('div');
        newCard.innerHTML = `
            <div class="card w-full bg-base-100 shadow-xl">
                <figure class="overflow-hidden h-72 rounded-lg">
                    <img class="w-4/5 min-h-52 rounded-lg" src="${video.thumbnail}" alt="" />
                    <h6 class="absolute bottom-[40%] right-12">0 hr</h6>
                </figure>
                <div class="card-body">
                    <div class="flex space-x-4 justify-start items-start">
                        <div>
                            <img class="w-12 h-12 rounded-full" src="${video.authors[0].profile_picture}" alt="" />
                        </div>
                        <div>
                            <h2 class="card-title">${video.title}</h2>
                            <div class="flex mt-3">
                                <p class="">${video.authors[0].profile_name}</p>
                                ${verifiedBadge}
                            </div>
                            <p class="mt-3">${video.others.views}</p>
                        </div>
                    </div>
                </div>
            </div>
        `;
        cardContainer.appendChild(newCard);
    })
}



loadCategories();
loadDataByCategories(displayCategory);