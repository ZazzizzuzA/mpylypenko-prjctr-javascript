export default `
<div class="first-tab">
          <div class="title">
            <h1>Таба 1. Отримання проміжку часу між датами</h1>
          </div>
          <div class="wrapper">
            <div class="full-width">
              <h3>Форма</h3>
              <form id="form" action="submit">
                <div class="form-wrapper">
                  <div class="presets first-row">
                    <h4>Готові періоди від початкової дати</h4>
                    <div class="presets-wrapper">
                      <button id="presetWeek">Тиждень</button>
                      <button id="presetMonth">Місяць</button>
                    </div>
                  </div>
                  <div class="inputs first-row">
                    <h4>Період</h4>
                    <div class="input-wrapper">
                      <div class="input-wrapper__input">
                        <div>
                          <span>Початкова дата</span>
                        </div>
                        <input type="date">
                      </div>
                      <div class="input-wrapper__input">
                        <div>
                          <span>Кінцева дата</span>
                        </div>
                        <input type="date">
                      </div>
                    </div>
                  </div>
                  <div class="options second-row">
                    <h4>Що порахувати</h4>
                    <div class="options-wrapper">
                      <div>
                        <input id="optionAllDays" type="radio" name="option1" value="all days" checked/>
                        <label for="optionAllDays">Всі дні</label>
                      </div>
                      <div>
                        <input id="optionWorkDays" type="radio" name="option1" value="work days"/>
                        <label for="optionWorkDays">Будні дні</label>
                      </div>
                      <div>
                        <input id="optionHolidayDays" type="radio" name="option1" value="holiday days"/>
                        <label for="optionHolidayDays">Вихідні дні</label>
                      </div>
                    </div>
                  </div>
                  <div class="options second-row">
                    <h4>Порахувати за розподілом</h4>
                    <div class="options-wrapper">
                      <div>
                        <input id="optionByDays" type="radio" name="option2" value="by days" checked/>
                        <label for="optionByDays">Кількість днів</label>
                      </div>
                      <div>
                        <input id="optionByHours" type="radio" name="option2" value="by hours"/>
                        <label for="optionByHours">Кількість годин</label>
                      </div>
                      <div>
                        <input id="optionByMinutes" type="radio" name="option2" value="by minutes"/>
                        <label for="optionByMinutes">Кількість хвилин</label>
                      </div>
                      <div>
                        <input id="optionBySeconds" type="radio" name="option2" value="by seconds"/>
                        <label for="optionBySeconds">Вихідні дні</label>
                      </div>
                    </div>
                  </div>
                  <div class="button-wrapper">
                    <button id="btnSubmit" class="button-wrapper__button">Get info</button>
                  </div>
                </div>
              </form>
            </div>
            <!-- <div class="result-wrapper">
              <h3>Результат</h3>
            </div> -->
          </div>
        </div>
`;

// module.exports = firstTabContent;