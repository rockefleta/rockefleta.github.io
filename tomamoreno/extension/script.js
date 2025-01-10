const apiURL = 'https://6780034e0476123f76a92fc7.mockapi.io/rockefleta';
const assetsBaseURL = 'https://rockefleta.github.io/assets/';

const url = new URL(apiURL);
url.searchParams.append('estado', true); 

fetch(url, {
  method: 'GET',
  headers: { 'content-type': 'application/json' },
})
  .then(res => {
    if (res.ok) {
      return res.json();
    }
  })
  .then(objects => {
    objects.forEach(obj => {
      const assetURL = `${assetsBaseURL}${obj.slug}`;
      injectAsset(assetURL);
    });
  })
  .catch(error => {});

function injectAsset(assetURL) {
  const fileExtension = assetURL.split('.').pop();

  if (fileExtension === 'css') {
    const linkElement = document.createElement('link');
    linkElement.rel = 'stylesheet';
    linkElement.href = assetURL;
    document.body.appendChild(linkElement); 
  } else if (fileExtension === 'js') {
    const scriptElement = document.createElement('script');
    scriptElement.src = assetURL;
    scriptElement.defer = true; 
    document.body.appendChild(scriptElement); 
  } 
}
