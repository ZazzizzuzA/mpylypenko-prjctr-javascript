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
                  <div class="first-row full-width">
                    <div class="presets first-row-cell">
                      <h4>Готові періоди від початкової дати</h4>
                      <div class="presets-wrapper">
                        <button id="presetWeek" class="btn-preset fifth">Тиждень (7 днів)</button>
                        <button id="presetMonth" class="btn-preset fifth">Місяць (30 днів)</button>
                      </div>
                    </div>
                    <div class="inputs first-row-cell">
                      <h4>Період</h4>
                      <div class="input-wrapper">
                        <div class="input-wrapper__input">
                          <div>
                            <span>Початкова дата</span>
                          </div>
                          <input type="date" id="startDate" name="start" class="btn-preset">
                        </div>
                        <div class="input-wrapper__input">
                          <div>
                            <span>Кінцева дата</span>
                          </div>
                          <input type="date" id="endDate" name="end" class="btn-preset">
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="options second-row">
                    <h4>Що порахувати</h4>
                    <div class="options-wrapper">
                      <div class="md-radio">
                        <input id="optionAllDays" type="radio" name="option1" value="all" checked/>
                        <label for="optionAllDays">Всі дні</label>
                      </div>
                      <div class="md-radio">
                        <input id="optionWorkDays" type="radio" name="option1" value="works"/>
                        <label for="optionWorkDays">Будні дні</label>
                      </div>
                      <div class="md-radio">
                        <input id="optionHolidayDays" type="radio" name="option1" value="weekends"/>
                        <label for="optionHolidayDays">Вихідні дні</label>
                      </div>
                    </div>
                  </div>
                  <div class="options second-row">
                    <h4>Порахувати за розподілом</h4>
                    <div class="options-wrapper">
                      <div class="md-radio">
                        <input id="optionByDays" type="radio" name="option2" value="days" checked/>
                        <label for="optionByDays">Кількість днів</label>
                      </div>
                      <div class="md-radio">
                        <input id="optionByHours" type="radio" name="option2" value="hours"/>
                        <label for="optionByHours">Кількість годин</label>
                      </div>
                      <div class="md-radio">
                        <input id="optionByMinutes" type="radio" name="option2" value="minutes"/>
                        <label for="optionByMinutes">Кількість хвилин</label>
                      </div>
                      <div class="md-radio">
                        <input id="optionBySeconds" type="radio" name="option2" value="seconds"/>
                        <label for="optionBySeconds">Кількість секунд</label>
                      </div>
                    </div>
                  </div>
                  <div class="button-wrapper">
                    <button id="btnSubmit" class="button-wrapper__button btn btn-intermediate">Get info</button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
`;

// module.exports = firstTabContent;