async function main() {
  const fetchData = await fetch("https://fakestoreapi.com/products");
  const datas = await fetchData.json();

  if (datas) {
    const mainElement = document.querySelector(".wrapper > main");
    const featuredData = datas.find((data) => data.id === 1);
    const filtiredDatas = datas.filter((data) => data.id !== 1);

    if (featuredData) {
      const now = Intl.DateTimeFormat(undefined, {
        day: "2-digit",
        month: "long",
        year: "numeric",
      }).format(Date.now());

      const featuredElement = createPostElement(featuredData, now);
      if (featuredElement) {
        mainElement.innerHTML = "";
        mainElement.appendChild(featuredElement);
      }

      const postGridSection = createPostGridSection(filtiredDatas, now);
      if (postGridSection) {
        mainElement.appendChild(postGridSection);
      }
    }
  }
}

main();

function createPostElement(data, time) {
  const post = document.createElement("div");
  post.classList.add("post");

  const params = new URLSearchParams({
    id: data.id,
  });

  post.innerHTML = `
        <div class="post_img">
            <img src=${data.image} alt="">
            </div>
            <div class="post_info">
            <p class="post_created_at">${time}</p>
            <h2 class="post_title">${data.title}</h2>
            <p class="description">
            ${data.description}
            </p>
            <a href =${`/new.html?${params}`} class="read_more">Read_more -></a>
            </div>`;
  return post;
}

function createPostGridSection(arr, time) {
  const sectionElement = document.createElement("section");
  sectionElement.classList.add("post_grid");

  for (const post of arr) {
    const postElement = createPostElement(post, time);
    sectionElement.appendChild(postElement);
  }
  return sectionElement;
}
