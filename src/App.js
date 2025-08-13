import { Heart, MapPin, Music, Search, Star, User } from "lucide-react"; // 아이콘 세트
import React, { useEffect, useState } from "react";

// 기본 CSS 스타일
const styles = `
  body {
    margin: 0;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans', sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji';
    color: #1f2937;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
  .app-container {
    background-color: #f3f4f6;
    min-height: 100vh;
  }
  .app-header {
    background-color: #fff;
    box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
    position: sticky;
    top: 0;
    z-index: 50;
  }
  .app-nav {
    max-width: 1280px;
    margin-left: auto;
    margin-right: auto;
    padding-left: 1rem;
    padding-right: 1rem;
    padding-top: 1rem;
    padding-bottom: 1rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .app-nav-logo {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }
  .app-nav-logo span {
    font-size: 1.25rem;
    font-weight: bold;
    color: #1f2937;
  }

  /* 버튼 스타일 */
  .button {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    border-radius: 0.375rem;
    font-size: 0.875rem;
    font-weight: 500;
    transition-property: color, background-color, border-color, text-decoration-color, fill, stroke, opacity, box-shadow, transform, filter, backdrop-filter;
    transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
    transition-duration: 150ms;
    outline: 2px solid transparent;
    outline-offset: 2px;
    height: 2.5rem;
    padding: 0.5rem 1rem;
    background-color: #111827;
    color: #f9fafb;
  }
  .button:hover {
    background-color: #111827d9;
  }
  .button:focus-visible {
    outline: 2px solid #111827;
    outline-offset: 2px;
  }
  .button.secondary {
    background-color: #e5e7eb;
    color: #374151;
  }
  .button.secondary:hover {
    background-color: #d1d5db;
  }

  /* 입력 필드 스타일 */
  .input {
    display: flex;
    height: 2.5rem;
    width: 100%;
    border-radius: 0.375rem;
    border: 1px solid #e5e7eb;
    background-color: #fff;
    padding: 0.5rem 0.75rem;
    font-size: 0.875rem;
    color: #1f2937;
    outline: none;
  }
  .input::placeholder {
    color: #9ca3af;
  }
  .input:focus-visible {
    border-color: #111827;
    outline: 2px solid #111827;
  }

  /* 메인 페이지 스타일 */
  .main-page {
    padding: 2rem;
    max-width: 1280px;
    margin-left: auto;
    margin-right: auto;
  }
  .main-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 2rem;
  }
  .main-header h1 {
    font-size: 1.875rem;
    font-weight: 800;
    color: #1f2937;
  }
  .search-container {
    position: relative;
  }
  .search-input {
    padding-left: 2.5rem;
  }
  .search-icon {
    position: absolute;
    left: 0.75rem;
    top: 50%;
    transform: translateY(-50%);
    color: #9ca3af;
  }
  .card-grid {
    display: grid;
    grid-template-columns: repeat(1, minmax(0, 1fr));
    gap: 1.5rem;
  }
  @media (min-width: 640px) {
    .card-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); }
  }
  @media (min-width: 768px) {
    .card-grid { grid-template-columns: repeat(3, minmax(0, 1fr)); }
  }
  @media (min-width: 1024px) {
    .card-grid { grid-template-columns: repeat(4, minmax(0, 1fr)); }
  }
  .person-card {
    background-color: #fff;
    border-radius: 1.5rem;
    overflow: hidden;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
    transition-property: all;
    transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
    transition-duration: 300ms;
    cursor: pointer;
  }
  .person-card:hover {
    transform: scale(1.05);
    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
  }
  .person-image {
    width: 100%;
    height: 12rem;
    object-fit: cover;
  }
  .person-card-content {
    padding: 1.25rem;
  }
  .person-card-content h3 {
    font-weight: bold;
    font-size: 1.25rem;
    color: #1f2937;
    margin-bottom: 0.25rem;
  }
  .person-card-content p {
    color: #4b5563;
    margin-bottom: 0.5rem;
  }
  .person-card-level {
    display: flex;
    align-items: center;
    font-size: 0.875rem;
    font-weight: 500;
    color: #6b7280;
  }
  .person-card-level svg {
    margin-right: 0.5rem;
    color: #84cc16;
  }
  .no-results {
    grid-column: span 4 / span 4;
    text-align: center;
    color: #6b7280;
    padding-top: 2.5rem;
    padding-bottom: 2.5rem;
  }

  /* 상세 페이지 스타일 */
  .detail-page {
    padding: 2rem;
    max-width: 1024px;
    margin-left: auto;
    margin-right: auto;
  }
  .detail-back-button-container {
    display: flex;
    align-items: center;
    margin-bottom: 1.5rem;
  }
  .detail-card {
    background-color: #fff;
    border-radius: 1.5rem;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
    padding: 1.5rem;
  }
  @media (min-width: 768px) {
    .detail-card { padding: 2.5rem; }
  }
  .detail-content {
    display: flex;
    flex-direction: column;
    gap: 2rem;
  }
  @media (min-width: 768px) {
    .detail-content { flex-direction: row; }
  }
  .detail-image-container {
    flex-shrink: 0;
    width: 100%;
  }
  @media (min-width: 768px) {
    .detail-image-container { width: 50%; }
  }
  .detail-image {
    border-radius: 1rem;
    width: 100%;
    height: auto;
    object-fit: cover;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  }
  .detail-info {
    flex: 1;
  }
  .detail-info h1 {
    font-size: 1.875rem;
    font-weight: 800;
    color: #1f2937;
    margin-bottom: 0.5rem;
  }
  @media (min-width: 768px) {
    .detail-info h1 { font-size: 2.25rem; }
  }
  .detail-info p {
    font-size: 1.25rem;
    color: #4b5563;
    margin-bottom: 1rem;
  }
  .info-grid {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 1rem 0;
    margin-bottom: 2rem;
    font-size: 1.125rem;
  }
  .info-item {
    display: flex;
    align-items: center;
  }
  .info-icon {
    width: 1.5rem;
    margin-right: 0.75rem;
    color: #84cc16;
  }
  .info-item span {
    font-weight: 600;
  }
  .stat-section {
    margin-bottom: 2rem;
  }
  .stat-section h3 {
    font-weight: bold;
    font-size: 1.25rem;
    margin-bottom: 0.5rem;
  }
  .stat-bar-container {
    width: 100%;
    background-color: #e5e7eb;
    border-radius: 9999px;
    height: 0.625rem;
  }
  .stat-bar {
    background-color: #84cc16;
    height: 0.625rem;
    border-radius: 9999px;
    transition-property: width;
    transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
    transition-duration: 500ms;
  }
  .story-section h3 {
    font-weight: bold;
    font-size: 1.25rem;
    margin-bottom: 0.5rem;
  }
  .story-section p {
    color: #374151;
    line-height: 1.625;
  }
`;

const Button = ({ children, ...props }) => (
  <button className="button" {...props}>
    {children}
  </button>
);

const Input = (props) => <input className="input" {...props} />;

// 더미 데이터 (동일)
const peopleData = [
  {
    id: 1,
    realName: "홍길동",
    nickname: "길동 아부지",
    level: 65,
    bloodType: "O",
    favoriteSong: "사랑의 트위스트",
    mbti: "ISFJ",
    latteStory:
      "내 젊을 땐 말이여, 동네 축제에서 상도 받았어. 노래 하나로 사람들을 다 울고 웃게 만들었지...",
    imageUrl: "https://placehold.co/400x400/FFB703/1F2937?text=홍길동",
    address: "의성읍 북부리",
    zodiacSign: "황소자리",
  },
  {
    id: 2,
    realName: "김철수",
    nickname: "철수 엄마",
    level: 72,
    bloodType: "A",
    favoriteSong: "아모르 파티",
    mbti: "ESFP",
    latteStory:
      "밭일하며 듣던 라디오에서 이 노래가 나오면 그렇게 신이 났어. 힘든 줄도 모르고 일했지.",
    imageUrl: "https://placehold.co/400x400/E63946/1F2937?text=김철수",
    address: "점곡면 구암리",
    zodiacSign: "처녀자리",
  },
  {
    id: 3,
    realName: "박영희",
    nickname: "영희 할매",
    level: 80,
    bloodType: "B",
    favoriteSong: "내 나이가 어때서",
    mbti: "INTJ",
    latteStory:
      "젊었을 땐 공부만 했어. 책 읽는 게 제일 좋았지. 지금도 신문을 매일 읽는단다.",
    imageUrl: "https://placehold.co/400x400/FFB703/1F2937?text=박영희",
    address: "단촌면 병방리",
    zodiacSign: "사자자리",
  },
  {
    id: 4,
    realName: "이순신",
    nickname: "순신 영감",
    level: 75,
    bloodType: "AB",
    favoriteSong: "만남",
    mbti: "ENTP",
    latteStory:
      "전국을 돌아다니며 장사했어. 새로운 사람 만나는 재미가 쏠쏠했지. 덕분에 모르는 사람이 없어.",
    imageUrl: "https://placehold.co/400x400/E63946/1F2937?text=이순신",
    address: "안계면 용기리",
    zodiacSign: "물병자리",
  },
  {
    id: 5,
    realName: "최영자",
    nickname: "영자 이모",
    level: 68,
    bloodType: "O",
    favoriteSong: "무조건",
    mbti: "ENFP",
    latteStory:
      "동네잔치에 빠지지 않고 참석했어. 춤추고 노래 부르는 걸 좋아했거든. 지금도 몸이 근질거려.",
    imageUrl: "https://placehold.co/400x400/FFB703/1F2937?text=최영자",
    address: "봉양면 화전리",
    zodiacSign: "쌍둥이자리",
  },
];

// Context API를 사용하여 상태 관리 (동일)
const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  const [currentPage, setCurrentPage] = useState("main");
  const [selectedPerson, setSelectedPerson] = useState(null);

  const navigateToDetail = (person) => {
    setSelectedPerson(person);
    setCurrentPage("detail");
  };

  const navigateToMain = () => {
    setCurrentPage("main");
    setSelectedPerson(null);
  };

  return (
    <AppContext.Provider
      value={{ currentPage, selectedPerson, navigateToDetail, navigateToMain }}
    >
      {children}
    </AppContext.Provider>
  );
};

// 메인 페이지 컴포넌트
const MainPage = () => {
  const { navigateToDetail } = React.useContext(AppContext);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredData, setFilteredData] = useState(peopleData);

  useEffect(() => {
    const results = peopleData.filter(
      (person) =>
        person.realName.includes(searchTerm) ||
        person.nickname.includes(searchTerm) ||
        person.address.includes(searchTerm)
    );
    setFilteredData(results);
  }, [searchTerm]);

  return (
    <div className="main-page">
      <div className="main-header">
        <h1 className="main-title">의성도감</h1>
        <div className="search-container">
          <Input
            type="text"
            placeholder="이름, 마을로 검색..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
          <Search className="search-icon" size={18} />
        </div>
      </div>
      <div className="card-grid">
        {filteredData.length > 0 ? (
          filteredData.map((person) => (
            <div
              key={person.id}
              className="person-card"
              onClick={() => navigateToDetail(person)}
            >
              <img
                src={person.imageUrl}
                alt={person.realName}
                className="person-image"
              />
              <div className="person-card-content">
                <h3>{person.realName}</h3>
                <p>"{person.nickname}"</p>
                <div className="person-card-level">
                  <User size={16} />
                  <span>Lv.{person.level}</span>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="no-results">
            <p>검색 결과가 없습니다.</p>
          </div>
        )}
      </div>
    </div>
  );
};

// 상세 페이지 컴포넌트
const DetailPage = () => {
  const { selectedPerson, navigateToMain } = React.useContext(AppContext);

  if (!selectedPerson) {
    return (
      <div className="detail-page">
        <h1>인물을 찾을 수 없습니다.</h1>
        <Button onClick={navigateToMain}>메인으로 돌아가기</Button>
      </div>
    );
  }

  const renderStatBar = (value, maxValue) => {
    const width = (value / maxValue) * 100;
    return (
      <div className="stat-bar-container">
        <div className="stat-bar" style={{ width: `${width}%` }}></div>
      </div>
    );
  };

  return (
    <div className="detail-page">
      <div className="detail-back-button-container">
        <button onClick={navigateToMain} className="button secondary">
          뒤로
        </button>
      </div>

      <div className="detail-card">
        <div className="detail-content">
          <div className="detail-image-container">
            <img
              src={selectedPerson.imageUrl}
              alt={selectedPerson.realName}
              className="detail-image"
            />
          </div>
          <div className="detail-info">
            <h1>{selectedPerson.realName}</h1>
            <p>"{selectedPerson.nickname}"</p>

            <div className="info-grid">
              <div className="info-item">
                <span className="info-icon">
                  <User />
                </span>
                <span>Lv.{selectedPerson.level}</span>
              </div>
              <div className="info-item">
                <span className="info-icon">
                  <Heart />
                </span>
                <span>{selectedPerson.bloodType}</span>
              </div>
              <div className="info-item">
                <span className="info-icon">
                  <Music />
                </span>
                <span>{selectedPerson.favoriteSong}</span>
              </div>
              <div className="info-item">
                <span className="info-icon">
                  <User />
                </span>
                <span>{selectedPerson.mbti}</span>
              </div>
              <div className="info-item">
                <span className="info-icon">
                  <MapPin />
                </span>
                <span>{selectedPerson.address}</span>
              </div>
              <div className="info-item">
                <span className="info-icon">
                  <Star />
                </span>
                <span>{selectedPerson.zodiacSign}</span>
              </div>
            </div>

            <div className="stat-section">
              <h3>스탯 UI</h3>
              <div className="space-y-3">
                <div>
                  <span className="text-sm">지혜</span>
                  {renderStatBar(85, 100)}
                </div>
                <div>
                  <span className="text-sm">유머</span>
                  {renderStatBar(70, 100)}
                </div>
                <div>
                  <span className="text-sm">정감</span>
                  {renderStatBar(90, 100)}
                </div>
              </div>
            </div>

            <div className="story-section">
              <h3>라떼는 이야기</h3>
              <p>{selectedPerson.latteStory}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const App = () => {
  return (
    <AppProvider>
      <style>{styles}</style>
      <div className="app-container">
        <header className="app-header">
          <nav className="app-nav">
            <div className="app-nav-logo">
              <span
                role="img"
                aria-label="Book emoji"
                style={{ fontSize: "1.875rem" }}
              >
                📘
              </span>
              <span>의성도감</span>
            </div>
            {/* Navigation links can be added here if needed */}
          </nav>
        </header>

        <main>
          <AppContext.Consumer>
            {({ currentPage }) => {
              switch (currentPage) {
                case "main":
                  return <MainPage />;
                case "detail":
                  return <DetailPage />;
                default:
                  return <MainPage />;
              }
            }}
          </AppContext.Consumer>
        </main>
      </div>
    </AppProvider>
  );
};

export default App;
