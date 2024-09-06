import React, { useState } from 'react';
import styles from '../../CSS/ChampionGlobalStats.module.css'; // Import modułu CSS
import axios, { AxiosError } from 'axios';
import Popup from "../Error/Popup";

export default function ChampionGlobalStats() {
  const [championName, setChampionName] = useState('');
  const [selectedColumns, setSelectedColumns] = useState({
    winRatio: false,
    minionsFirst10Minutes: false,
    totalCS: false,
    csPerMinute: false,
    kda: false,
    visionScore: false,
    kills: false,
    deaths: false,
    assists: false,
    totalDamageDealtToChampions: false,
    gameLength: false,
  });

  const [filters, setFilters] = useState({
    kills: { active: false, value: 0, comparison: 'greater' },
    gameLength: { active: false, value: 0, comparison: 'greater' },
    totalCS: { active: false, value: 0, comparison: 'greater' }, // Dodany filtr TotalCS
    visionScore: { active: false, value: 0, comparison: 'greater' }, // Dodany filtr VisionScore
    totalDamageDealt: { active: false, value: 0, comparison: 'greater' },
    lane: { active: false, value: 'ALL' },
    result: { active: false, value: 'All' },
  });
  const [filtersPopup, setFiltersPopup] = useState({});

  const [results, setResults] = useState(null); // Przechowywanie wyników
  const [optionalError, setOptionalError] = useState(null); // Błąd
  const [showPopup, setShowPopup] = useState(false); // Widoczność popupu

  const handleChampionNameChange = (e) => {
    setChampionName(e.target.value);
  };
  const handleColumnToggle = (column) => {
    setSelectedColumns((prevColumns) => ({
      ...prevColumns,
      [column]: !prevColumns[column],
    }));
  };
  const toggleFilter = (filter) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [filter]: { ...prevFilters[filter], active: !prevFilters[filter].active },
    }));
  };
  const handleFilterChange = (e, field) => {
    setFilters({
      ...filters,
      [field]: { ...filters[field], value: e.target.value }, // Dla liczb
    });
  };
  const handleLaneChange = (e) => {
    setFilters({
      ...filters,
      lane: { ...filters.lane, value: e.target.value }, // Zmiana wartości dla lane
    });
  };
  const handleResultChange = (e) => {
    setFilters({
      ...filters,
      result: { ...filters.result, value: e.target.value }, // Zmiana wartości dla result
    });
  };
  const handleComparisonChange = (e, field) => {
    setFilters({
      ...filters,
      [field]: { ...filters[field], comparison: e.target.value },
    });
  };
  const fetchGlobalStats = async () => {
    try {
      // Przygotowanie aktywnych filtrów liczbowych
      const activeFilters = {};

      // Przetwarzanie liczbowych filtrów
      Object.keys(filters).forEach((key) => {
        if (filters[key].active && filters[key].value !== null && key !== 'lane' && key !== 'result') {
          activeFilters[key] = {
            value: filters[key].value,
            comparison: filters[key].comparison
          };
        }
      });

      // Ustawiamy filtry dla Lane i Result jako FilterStringValue
      if (filters.lane.active) {
        activeFilters.lane = { value: filters.lane.value }; // Zmieniamy wartość w oparciu o wybór
      }

      if (filters.result.active) {
        activeFilters.result = { value: filters.result.value }; // Zmieniamy wartość w oparciu o wybór
      }
      setFiltersPopup(activeFilters);
      // Owinięcie danych w obiekt "request"
      const requestBody = {
        championName,
        selectedColumns: selectedColumns,
        filters: activeFilters
      };

      // Wysyłanie danych jako body POST requestu z obiektem request
      const response = await axios.post(
        'https://localhost:7041/api/ChampionGlobalStats/ChampionStatistics',
        JSON.stringify(requestBody), // Konwersja requestBody do JSON
        {
          headers: {
            'Content-Type': 'application/json', // Ustawienie nagłówka Content-Type
          },
        }
      );
      console.log(response.data);
      setResults(response.data); // Przypisujemy wyniki do results
      setShowPopup(true); // Pokazujemy popup z wynikami
    } catch (AxiosError) {
      console.error(AxiosError.response.data);
      setOptionalError(AxiosError.response.data);
      setShowPopup(true); // Pokazujemy popup z błędem
    }
  };

  const closePopup = () => {
    setShowPopup(false);
    setOptionalError(null); // Resetujemy błąd
    setResults(null); // Resetujemy wyniki
  };

  return (
    <div className={styles.championContainer}>
      {/* Formularz filtrowania */}
      <div className={styles.championLeftPanel}>
        <h2>Select Champion:</h2>
        <input
          type="text"
          className={styles.championInput}
          value={championName}
          onChange={handleChampionNameChange}
          placeholder="Enter champion name"
        />

        <h2>Select Columns:</h2>
        <div className={styles.championGrid}>
          {[
            { label: 'Win Ratio', column: 'winRatio' },
            { label: 'Minions First 10 Minutes', column: 'minionsFirst10Minutes' },
            { label: 'Total CS', column: 'totalCS' },
            { label: 'CS per Minute', column: 'csPerMinute' },
            { label: 'KDA', column: 'kda' },
            { label: 'Vision Score', column: 'visionScore' },
            { label: 'Kills', column: 'kills' },
            { label: 'Deaths', column: 'deaths' },
            { label: 'Assists', column: 'assists' },
            { label: 'Total Damage Dealt', column: 'totalDamageDealtToChampions' },
            { label: 'Game Length', column: 'gameLength' },
          ].map((checkbox, idx) => (
            <label key={idx} className={`${styles.championCheckboxLabel} ${styles.mainCheckbox}`}>
              <input
                type="checkbox"
                checked={selectedColumns[checkbox.column]}
                onChange={() => handleColumnToggle(checkbox.column)}
              />
              {checkbox.label}
            </label>
          ))}
        </div><br></br>

        <h3>Filters:</h3>
        <div className={styles.championFilters}>
          {/* Filtr Kills */}
          <div className={styles.championFilterRow}>
            <label>
              <input
                type="checkbox"
                checked={filters.kills.active}
                onChange={() => toggleFilter('kills')}
              />
              Kills:
            </label>
            {filters.kills.active && (
              <>
                <select
                  className={styles.championFilterSelect}
                  value={filters.kills.comparison}
                  onChange={(e) => handleComparisonChange(e, 'kills')}
                >
                  <option value="greater">Greater than</option>
                  <option value="less">Less than</option>
                </select>
                <input
                  type="number"
                  className={styles.championFilterInput}
                  value={filters.kills.value || ''}
                  onChange={(e) => handleFilterChange(e, 'kills')}
                  placeholder="Kills"
                />
              </>
            )}
          </div>

          {/* Filtr Game Length */}
          <div className={styles.championFilterRow}>
            <label>
              <input
                type="checkbox"
                checked={filters.gameLength.active}
                onChange={() => toggleFilter('gameLength')}
              />
              Game Length:
            </label>
            {filters.gameLength.active && (
              <>
                <select
                  className={styles.championFilterSelect}
                  value={filters.gameLength.comparison}
                  onChange={(e) => handleComparisonChange(e, 'gameLength')}
                >
                  <option value="greater">Greater than</option>
                  <option value="less">Less than</option>
                </select>
                <input
                  type="number"
                  className={styles.championFilterInput}
                  value={filters.gameLength.value || ''}
                  onChange={(e) => handleFilterChange(e, 'gameLength')}
                  placeholder="Game Length"
                />
              </>
            )}
          </div>

          {/* Filtr Total CS */}
          <div className={styles.championFilterRow}>
            <label>
              <input
                type="checkbox"
                checked={filters.totalCS.active}
                onChange={() => toggleFilter('totalCS')}
              />
              Total CS:
            </label>
            {filters.totalCS.active && (
              <>
                <select
                  className={styles.championFilterSelect}
                  value={filters.totalCS.comparison}
                  onChange={(e) => handleComparisonChange(e, 'totalCS')}
                >
                  <option value="greater">Greater than</option>
                  <option value="less">Less than</option>
                </select>
                <input
                  type="number"
                  className={styles.championFilterInput}
                  value={filters.totalCS.value || ''}
                  onChange={(e) => handleFilterChange(e, 'totalCS')}
                  placeholder="Total CS"
                />
              </>
            )}
          </div>

          {/* Filtr Vision Score */}
          <div className={styles.championFilterRow}>
            <label>
              <input
                type="checkbox"
                checked={filters.visionScore.active}
                onChange={() => toggleFilter('visionScore')}
              />
              Vision Score:
            </label>
            {filters.visionScore.active && (
              <>
                <select
                  className={styles.championFilterSelect}
                  value={filters.visionScore.comparison}
                  onChange={(e) => handleComparisonChange(e, 'visionScore')}
                >
                  <option value="greater">Greater than</option>
                  <option value="less">Less than</option>
                </select>
                <input
                  type="number"
                  className={styles.championFilterInput}
                  value={filters.visionScore.value || ''}
                  onChange={(e) => handleFilterChange(e, 'visionScore')}
                  placeholder="Vision Score"
                />
              </>
            )}
          </div>

          {/* Filtr Lane */}
          <div className={styles.championFilterRow}>
            <label>
              <input
                type="checkbox"
                checked={filters.lane.active}
                onChange={() => toggleFilter('lane')}
              />
              Lane:
            </label>
            {filters.lane.active && (
              <select
                className={styles.championFilterSelect}
                value={filters.lane.value}
                onChange={handleLaneChange} // Aktualizacja stanu dla Lane
              >
                <option value="ALL">ALL</option>
                <option value="TOP">TOP</option>
                <option value="JUNGLE">JUNGLE</option>
                <option value="MIDDLE">MIDDLE</option>
                <option value="BOTTOM">BOTTOM</option>
                <option value="UTILITY">UTILITY</option>
              </select>
            )}
          </div>

          {/* Filtr Result */}
          <div className={styles.championFilterRow}>
            <label>
              <input
                type="checkbox"
                checked={filters.result.active}
                onChange={() => toggleFilter('result')}
              />
              Result:
            </label>
            {filters.result.active && (
              <select
                className={styles.championFilterSelect}
                value={filters.result.value}
                onChange={handleResultChange} // Aktualizacja stanu dla Result
              >
                <option value="Win">Win</option>
                <option value="Loss">Loss</option>
                <option value="All">All</option>
              </select>
            )}
          </div>

          {/* Filtr Total Damage Dealt */}
          <div className={styles.championFilterRow}>
            <label>
              <input
                type="checkbox"
                checked={filters.totalDamageDealt.active}
                onChange={() => toggleFilter('totalDamageDealt')}
              />
              Total Damage Dealt:
            </label>
            {filters.totalDamageDealt.active && (
              <>
                <select
                  className={styles.championFilterSelect}
                  value={filters.totalDamageDealt.comparison}
                  onChange={(e) => handleComparisonChange(e, 'totalDamageDealt')}
                >
                  <option value="greater">Greater than</option>
                  <option value="less">Less than</option>
                </select>
                <input
                  type="number"
                  className={styles.championFilterInput}
                  value={filters.totalDamageDealt.value || ''}
                  onChange={(e) => handleFilterChange(e, 'totalDamageDealt')}
                  placeholder="Damage Dealt"
                />
              </>
            )}
          </div>
        </div>

        <button className={styles.championButton} onClick={fetchGlobalStats}>
          Fetch Global Stats
        </button>
      </div>

      {/* Sekcja wyświetlania wyników */}
      {/* Popup */}
      {showPopup && (
        <Popup
          onClose={closePopup}
          data={results}
          error={optionalError}
          filters={filtersPopup}
        />
      )}
    </div>
  );
}
