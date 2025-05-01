test('basic sanity', () =>{
    expect(1+1).toBe(2);
  })
  describe('Article content tests (html)', ()=> {
    beforeEach(()=> {
      document.body.innerHTML = 
      `<!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>The New York Times</title>
          <link rel="stylesheet" href="static/styles.css">
          <script src="static/main.js" defer></script>
        </head>
        <body>
          <header>
              <!-- top bar -->
              <div id="title-bar">
                  <div id="date-container">
                      <div id="current-date"></div>
                      <div>
                          Today's Paper
                      </div>
                  </div>
                  <div id="logo">
                      <a href="index.html">
                          <img src="static/assets/Logo.png" alt="The New York Times Logo">
                      </a>
                  </div>
                  <div>
                  </div>
              </div>
              <!-- second bar -->
              <nav>
                  <!-- for spacing -->
                  <div class="side-tab">
  
                  </div>
                  <div class="tab">
                      U.S.
                  </div>
                  <div class="tab">
                      World
                  </div>
                  <div class="tab">
                      Business
                  </div>
                  <div class="tab">
                      Arts
                  </div>
                  <div class="tab">
                      Lifestyle
                  </div>
                  <div class="tab">
                      Opinion
                  </div>
                  <div class="tab">
                      Audio
                  </div>
                  <div class="tab">
                      Games
                  </div>
                  <div class="tab">
                      Cooking
                  </div>
                  <div class="tab">
                      Wirecutter
                  </div>
                  <div class="tab">
                      The Athletic
                  </div>
                  <!-- for spacing -->
                  <div class="side-tab">
  
                  </div>
              </nav>
          </header>
          <main class="container">
              <section class="left-column">
              </section>
              <section class="main-column">
              </section>
              <section class="right-column">
              </section>
          </main>
          <footer>
              <p>&copy; 2025 The New York Times</p>
          </footer>
        </body>
        </html>`;
    })
    test('logo rendering', () => {
      const img = document.querySelector('#logo img');
      expect(img.getAttribute('src')).toBe('static/assets/Logo.png');
      expect(img.getAttribute('alt')).toBe('The New York Times Logo');
    });
    test('nav bar', ()=>{
      const navBar = Array.from(document.querySelectorAll('.tab')).map(element => element.textContent.trim());
      expect(navBar).toEqual(['U.S.', 'World', 'Business', 'Arts', 'Lifestyle',
        'Opinion', 'Audio', 'Games', 'Cooking', 'Wirecutter', 'The Athletic']);
    });
    test('footer', () => {
      const footer = (document.querySelector('footer')).textContent.trim();
      expect(footer).toEqual('© 2025 The New York Times');
    });
  });
  

  
  