self.addEventListener("install", (event) => {
    console.log("Service Worker installed");
});

self.addEventListener("fetch", (event) => {
    // пока ничего не делаем
});
