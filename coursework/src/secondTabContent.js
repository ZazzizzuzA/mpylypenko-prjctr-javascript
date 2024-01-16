export default `
<div class="second-tab">
  <div class="title">
    <h1>Таба 2. Отримання святкових дат</h1>
  </div>
  <div class="wrapper">
  <div class="full-width">
    <h3>Форма</h3>
    
      <form id="form" action="submit">
        <div class="form-wrapper">
          <div class="first-row full-width">
            <div class="inputs full-width">
              <div class="input-wrapper full-width">
                <div class="input-wrapper__input">
                  <div>
                    <span>Країна</span>
                  </div>
                  <div class="field">
                    <div class="field__body">
                      <div class="select-box">
                        <select name="countries"></select>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="input-wrapper__input">
                  <div>
                    <span>Рік</span>
                  </div>
                  <div class="field">
                    <div class="field__body">
                      <div class="select-box">
                        <select name="years" disabled></select>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="second-row full-width">
            <div class="button-wrapper">
              <button id="btnSubmit" class="button-wrapper__button btn btn-intermediate">Get info</button>
            </div>
          </div>
        </div>
      </form>
   
  </div>
</div>
`;
