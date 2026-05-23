import express from "express";
import path from "path";
import fs from "fs";
import { createServer as createViteServer } from "vite";

const PORT = 3000;
const DB_DIR_TMP = "/tmp/data";
const DB_PATH = path.join(DB_DIR_TMP, "db.json");
const UPLOADS_DIR = "/tmp/uploads";

// Standard portfolio data schema
const INITIAL_DATA = {
  featuredProjects: [
    {
      title: "2024 WATERBOMB",
      category: "운영",
      year: "2024",
      image: "https://raw.githubusercontent.com/2green-lee/Portfolio/9d41580d7739017f4b186f92faf6491a60264fd5/2024waterbomb.png",
      contribution: "25%",
      description: "2024년 서울에서 개최된 대규모 워터 페스티벌의 통합 현장 운영 및 관리 시스템 구축.",
      fullDescription: "메이드온을 포함한 다수의 기획사가 고객사로 참여하였으며, 관객의 사전 구매부터 현장 체류 전 과정을 관리했습니다. 티켓 및 입장, F&B, 셔틀버스, 물품보관소 등 현장 운영 전반을 통합 수행하며 관객 접점의 서비스 품질을 높였습니다.",
      process: [
        {
          phase: "사전 운영",
          items: [
            "QueensSmile 앱 기반 서비스 및 티켓 판매 운영",
            "운영 정책 및 고객 응대 기준 정리",
            "현장 운영 인력 배치 및 가이드 공유"
          ]
        },
        {
          phase: "현장 운영",
          items: [
            "입장, F&B, 셔틀, 물품보관소 등 다영역 동시 운영",
            "관객 동선 관리 및 혼잡 최소화",
            "운영 영역 간 충돌 발생 시 즉각적인 조율 진행"
          ]
        },
        {
          phase: "이슈 대응",
          items: [
            "온라인 및 현장에서 발생하는 이슈를 신속히 공유",
            "운영 전반에 미치는 영향을 고려하여 우선순위 조정"
          ]
        }
      ],
      role: {
        title: "티켓 총괄 운영",
        items: [
          "QueensSmile 플랫폼 기반 티켓 판매 및 발권 운영",
          "온라인 고객 문의(CS) 직접 대응",
          "현장 티켓 부스 운영 및 스탭 인솔",
          "QR 코드 기반 입장 시스템 운영 및 오류 대응",
          "초대권 및 관계자 티켓 전체 관리",
          "현장 돌발 이슈 발생 시 즉각적인 판단 및 문제 해결 주도",
          "티켓 관련 이슈를 운영 전반 관점에서 공유 및 조율"
        ]
      },
      results: [
        "대규모 관객이 참여하는 페스티벌의 다영역 통합 운영을 안정적으로 수행",
        "온라인–오프라인 운영 연계를 통해 관객 경험의 일관성 확보",
        "운영 영역 간 협업을 통해 현장 혼선 최소화",
        "고객사로부터 운영 전반에 대한 신뢰도 확보",
        "자체 플랫폼을 활용한 서비스 운영 경험 축적"
      ],
      details: [
        "서울 스테이지 및 관객 구역 통합 현장 운영 및 관리",
        "관객 접점 전반의 운영 프로세스 설계 및 실행",
        "자체 앱 및 키오스크를 연계한 온-오프라인 통합 결제 시스템 관리"
      ]
    },
    {
      title: "2024 부산국제록페스티벌",
      category: "운영",
      year: "2024",
      image: "https://raw.githubusercontent.com/2green-lee/Portfolio/301715e6090e002a7c306c6d76f35d8d78ed92f4/2024bsrock.png",
      contribution: "25%",
      objectPosition: "top",
      description: "부산국제록페스티벌의 공식 MD 및 아티스트 굿즈 판매 부스 운영 총괄.",
      fullDescription: "본 프로젝트에서 페스티벌 공식 MD 판매 부스 운영을 담당하였습니다.\n\nQueensSmile 앱을 활용한 MD 상품 사전 판매와 현장 판매를 병행하는 운영 구조를 구축하였으며, 페스티벌 기간 3일간 MD 판매 부스를 상시 운영하였습니다. 또한, 주최사인 부산축제조직위원회와 긴밀히 소통하며 페스티벌 공식 굿즈뿐만 아니라 아티스트 굿즈까지 포함한 복합 MD 운영을 수행하였습니다.",
      role: {
        title: "운영PM",
        items: [
          "QueensSmile 앱 내 페스티벌 전용 MD 상품 구성 및 사전 판매 운영",
          "현장 MD 판매 부스 운영 총괄",
          "주최사(부산축제조직위원회) 및 아티스트 소속사 커뮤니케이션",
          "아티스트 굿즈 입·출고 관리 및 반송 조율",
          "판매 스탭 선발, 관리 및 현장 인솔",
          "페스티벌 기간(3일) 현장 운영 이슈 대응 및 문제 해결"
        ]
      },
      process: [
        {
          phase: "사전 운영",
          items: [
            "QueensSmile 앱 내 페스티벌 전용 MD 상품 구성 및 사전 판매 오픈",
            "현장 판매 운영 프로세스 및 재고 관리 기준 수립",
            "주최사 및 아티스트 소속사와의 커뮤니케이션 창구 역할 수행"
          ]
        },
        {
          phase: "현장 운영",
          items: [
            "MD 판매 부스 설치 및 운영",
            "사전 구매 고객 및 현장 구매 고객 대응",
            "페스티벌 기간 3일간 상시 부스 운영",
            "판매 스탭 관리 및 현장 운영 총괄"
          ]
        },
        {
          phase: "사후 처리",
          items: [
            "잔여 아티스트 굿즈 정리 및 반출",
            "아티스트 소속사와의 정산 및 반송 커뮤니케이션"
          ]
        }
      ],
      results: [
        "플랫폼 기반 MD 사전 판매와 현장 판매의 안정적 병행 운영",
        "페스티벌 MD 및 다수 아티스트 굿즈의 통합 운영 성공",
        "주최사 및 아티스트 소속사와의 원활한 협업을 통한 운영 신뢰도 확보",
        "페스티벌 기간 동안 MD 판매 부스 안정적 운영",
        "굿즈 제작–판매–반출까지 이어지는 전 과정 운영 경험 축적"
      ],
      details: [
        "공식 MD 및 아티스트 굿즈 판매 부스 운영",
        "주최측과의 실시간 커뮤니케이션 및 재고 관리",
        "현장 인력 교육 및 효율적인 대기 라인 관리"
      ]
    },
    {
      title: "2024 인천펜타포트록페스티벌",
      category: "운영",
      year: "2024",
      image: "https://raw.githubusercontent.com/2green-lee/Portfolio/301715e6090e002a7c306c6d76f35d8d78ed92f4/2024incheonrock.png",
      contribution: "25%",
      description: "본 프로젝트에서 관객 편의 시설 중심의 운영 영역을 담당하였습니다.",
      fullDescription: "F&B(Food & Beverage) 운영 및 물품보관소 운영을 수행하였으며, 사전 주문부터 현장 수령까지 이어지는 F&B 운영 구조를 구축하여 관객 대기 시간을 최소화하고 현장 혼선을 줄이는 것을 목표로 운영하였습니다.\n\n특히, 자체 플랫폼인 QueensSmile 앱을 활용하여 음식 상품을 시간 단위 사전 예약 방식으로 판매하고, 현장에서는 당사가 보유한 키오스크를 통해 추가 판매를 병행하는 온라인–오프라인 연계 운영을 진행하였습니다.",
      role: {
        title: "운영PM",
        items: [
          "F&B 업체 선정 및 협업 관리",
          "음식 상품 기획 및 QueensSmile 앱 상품 오픈",
          "시간 단위 사전 예약 판매 운영 총괄",
          "현장 키오스크 판매 운영 관리",
          "F&B 및 물품보관소 현장 운영 총괄",
          "운영 스탭 관리 및 인솔",
          "현장 이슈 발생 시 즉각 대응 및 문제 해결 주도"
        ]
      },
      results: [
        "시간 단위 F&B 사전 예약 운영을 통해 관객 대기 시간 최소화",
        "사전 판매와 현장 판매 병행으로 F&B 운영 효율성 확보",
        "현장 혼잡도 감소를 통한 관객 이용 만족도 향상",
        "대규모 페스티벌 환경에서 F&B 및 편의 시설 운영 안정화",
        "자체 플랫폼을 활용한 서비스 운영 강점 검증"
      ],
      details: [
        "시간 단위 F&B 사전 예약 시스템 구축",
        "대기 시간 최소화를 위한 현장 운영 가이드라인 설계",
        "클라이언트 및 입점 업체 통합 관리"
      ]
    },
    {
      title: "2024 이슬라이브페스티벌",
      category: "운영",
      year: "2024",
      image: "https://raw.githubusercontent.com/2green-lee/Portfolio/301715e6090e002a7c306c6d76f35d8d78ed92f4/2024cham.jpg",
      contribution: "25%",
      description: "본 프로젝트에서 당사는 F&B 운영 전반을 담당하였습니다.",
      fullDescription: "본 프로젝트에서 당사는 F&B 운영 전반을 담당하였습니다.\n\n본 행사는 하이트진로를 클라이언트로 하여 진행되었으며, 관객 편의와 현장 운영 효율을 고려한 F&B 운영 구조를 설계 및 실행하였습니다. 다수 페스티벌에서의 운영 경험을 바탕으로, 사전 판매와 현장 판매를 병행하는 F&B 운영 방식을 적용하여 단일 일정의 페스티벌 환경에서도 안정적인 운영을 목표로 하였습니다.",
      role: {
        title: "운영PM",
        items: [
          "F&B 운영 구조 설계 및 실행",
          "상품 구성 및 판매 방식 운영 관리",
          "현장 F&B 부스 운영 총괄",
          "운영 스탭 관리 및 현장 인솔",
          "현장 이슈 발생 시 즉각적인 판단 및 문제 해결 주도",
          "클라이언트(하이트진로)와의 운영 관련 커뮤니케이션 지원"
        ]
      },
      process: [
        {
          phase: "사전 운영",
          items: [
            "F&B 운영 계획 수립",
            "상품 구성 및 판매 방식 정리",
            "현장 운영 가이드 및 스탭 배치 계획 수립"
          ]
        },
        {
          phase: "현장 운영",
          items: [
            "F&B 부스 설치 및 운영",
            "사전 구매 및 현장 구매 고객 대응",
            "관객 동선 관리 및 혼잡 대응",
            "스탭 관리 및 현장 운영 총괄"
          ]
        },
        {
          phase: "이슈 대응",
          items: [
            "주문·수령 과정에서 발생하는 현장 이슈 즉각 대응",
            "운영 방식 조정을 통한 현장 안정화"
          ]
        }
      ],
      results: [
        "단일 일정 대형 페스티벌에서 F&B 운영 안정적으로 수행",
        "관객 대기 시간 최소화를 통한 현장 이용 만족도 확보",
        "브랜드 행사에 적합한 운영 품질 유지",
        "이전 페스티벌 운영 경험을 성공적으로 확장 적용"
      ],
      details: [
        "현장 운영 프로세스 최적화",
        "관객 동선 및 안전 관리 시스템 구축",
        "F&B 및 편의시설 통합 운영 관리"
      ]
    }
  ],
  personalProjects: [
    {
      title: "GREENERY : 푸르게 푸르게 푸르러져라",
      category: "Music",
      year: "2023",
      image: "https://raw.githubusercontent.com/2green-lee/Portfolio/dde4b078950d3eb0fcb261ee4f72cd9f4c0031b2/img5.png",
      contribution: "70%",
      location: "Online & Offline Distribution",
      cast: "이그린 (Lee Green)",
      support: "텀블벅 크라우드 펀딩 프로젝트",
      description: "싱어송라이터 이그린 EP <GREENERY> 발매. 발매 작업기를 담은 책 형태의 새로운 앨범.",
      fullDescription: "싱어송라이터 ‘이그린’의 EP [GREENERY] 발매와 함께, 창작 과정과 영감을 기록한 아트북 형태의 피지컬 앨범을 기획·제작했습니다.\n\n효용성이 낮은 기존 플라스틱 CD의 한계를 문제로 정의하고, 이를 대체할 수 있는 새로운 형태의 앨범을 설계했습니다. 텀블벅 크라우드펀딩을 통해 목표 금액의 196%를 달성하며 프로젝트를 성공적으로 런칭했습니다.\n\n전곡 작사, 작곡, 프로듀싱은 물론, 디자인 디렉팅, 유통, 쇼케이스 기획까지 프로젝트 전반을 주도했습니다.",
      role: {
        title: "담당 업무",
        items: [
          "Planning: 프로젝트 전체 기획\n펀딩 전략 수립",
          "Production: 앨범 제작\n책 디자인 및 출판\n아티스트 굿즈 제작",
          "Promotion: 펀딩 홍보 영상 제작\nSNS 운영\n라이브 영상 제작",
          "Operation: 쇼케이스 기획 및 진행"
        ]
      },
      results: [
        "텀블벅 크라우드 펀딩을 통해 프로젝트 자금 확보 및 시장 반응 검증 -> 텀블벅 크라우드 펀딩 196% 초과 달성\n목표 금액 대비 높은 참여율과 지지 확보",
        "책 형태의 아티스트 앨범 제작 및 유통 구조 구축 -> 앨범 제작 및 출판 완료\n온·오프라인 10개 판매처 입점 및 판매 진행",
        "출판 콘텐츠를 확장한 관객 참여형 프로그램 기획 -> '하나의 생각이 노래가 되기까지' 출판 프로모션 워크숍 진행",
        "다채널 홍보를 통한 프로젝트 인지도 확대 -> 펀딩 홍보 영상 제작\n인스타그램, 팟캐스트 등 온라인 채널 중심 홍보 운영",
        "앨범 발매를 알리는 오프라인 이벤트 기획 및 실행 -> 발매 쇼케이스 기획 및 진행"
      ],
      images: [
        "https://raw.githubusercontent.com/2green-lee/Portfolio/18058546a05717340bdf053b56e6299f30f02c7d/img%2052.jpg",
        "https://raw.githubusercontent.com/2green-lee/Portfolio/013cde7d59ad00b704b19423085d2b9bfc269884/img%2051.jpg",
        "https://raw.githubusercontent.com/2green-lee/Portfolio/18058546a05717340bdf053b56e6299f30f02c7d/img%2054.jpg",
        "https://raw.githubusercontent.com/2green-lee/Portfolio/18058546a05717340bdf053b56e6299f30f02c7d/img%2055.jpg",
        "https://raw.githubusercontent.com/2green-lee/Portfolio/18058546a05717340bdf053b56e6299f30f02c7d/img%2056.jpg",
        "https://raw.githubusercontent.com/2green-lee/Portfolio/18058546a05717340bdf053b56e6299f30f02c7d/img%2057.jpg",
        "https://raw.githubusercontent.com/2green-lee/Portfolio/18058546a05717340bdf053b56e6299f30f02c7d/img%2053.jpg",
        "https://raw.githubusercontent.com/2green-lee/Portfolio/18058546a05717340bdf053b56e6299f30f02c7d/img%2058.jpg",
        "https://raw.githubusercontent.com/2green-lee/Portfolio/18058546a05717340bdf053b56e6299f30f02c7d/img%2059.jpg",
        "https://raw.githubusercontent.com/2green-lee/Portfolio/18058546a05717340bdf053b56e6299f30f02c7d/img%2060.jpg",
        "https://raw.githubusercontent.com/2green-lee/Portfolio/18058546a05717340bdf053b56e6299f30f02c7d/img%2061.jpg",
        "https://raw.githubusercontent.com/2green-lee/Portfolio/18058546a05717340bdf053b56e6299f30f02c7d/img%2063.jpg"
      ]
    },
    {
      title: "Flower Planet",
      category: "Concert",
      year: "2022",
      image: "https://raw.githubusercontent.com/2green-lee/Portfolio/dde4b078950d3eb0fcb261ee4f72cd9f4c0031b2/img4.jpg",
      contribution: "70%",
      location: "KT&G 상상마당 부산 3F 라이브홀",
      support: "KT&G 상상마당 부산",
      cast: "우예린, 이그린",
      objectPosition: "top",
      description: "부산 아티스트 이그린과 서울 아티스트 우예린의 콜라보레이션 공연.",
      fullDescription: "부산을 기반으로 활동하는 아티스트 '이그린'과 서울의 아티스트 '우예린'이 만나 음악적 교감을 나누는 특별한 콜라보레이션 무대를 기획했습니다.\n\n서로 다른 지역적 배경을 가진 두 아티스트의 조화를 통해 새로운 관객층을 유입시키고, 단순한 공연을 넘어 체험형 콘텐츠를 결합하여 관객들에게 잊지 못할 경험을 선사하는 것을 목표로 했습니다. 기획부터 제작, 홍보, 현장 운영까지 공연의 전 단계에 걸쳐 밀도 높은 작업을 수행했습니다.",
      role: {
        title: "담당 업무",
        items: [
          "Planning: 기획서 작성\n공연 전체 컨셉 수립",
          "Booking: 아티스트 섭외\n공연장(KT&G 상상마당) 조율",
          "Promotion: SNS 마케팅 전략 수립\n라이브 홍보 영상 기획",
          "Production: 포스터, 굿즈, 홍보 영상 등\n비주얼 에셋 제작 총괄",
          "Operation: 공연 당일 현장 운영\n타임테이블 관리"
        ]
      },
      results: [
        "관객 유입 확대 및 티켓 판매율 제고 -> 전체 티켓 매진",
        "온오프라인 콘텐츠 제작 -> 컨셉 영상 제작\n헤나 체험 부스 운영",
        "다채널 홍보를 통한 인지도 확산 -> SNS 영상 홍보물 배포\n티켓 2+1 프로모션 진행"
      ],
      images: [
        "https://raw.githubusercontent.com/2green-lee/Portfolio/6aede115c9be14770644c83685839c915a9b2ae6/img%2041.jpg",
        "https://raw.githubusercontent.com/2green-lee/Portfolio/6aede115c9be14770644c83685839c915a9b2ae6/img%2042.jpg",
        "https://raw.githubusercontent.com/2green-lee/Portfolio/6aede115c9be14770644c83685839c915a9b2ae6/img%2043.jpg",
        "https://raw.githubusercontent.com/2green-lee/Portfolio/6aede115c9be14770644c83685839c915a9b2ae6/img%2044.jpg",
        "https://raw.githubusercontent.com/2green-lee/Portfolio/6aede115c9be14770644c83685839c915a9b2ae6/img%2045.jpg",
        "https://raw.githubusercontent.com/2green-lee/Portfolio/6aede115c9be14770644c83685839c915a9b2ae6/img%2046.jpg",
        "https://raw.githubusercontent.com/2green-lee/Portfolio/6aede115c9be14770644c83685839c915a9b2ae6/img%2047.jpg"
      ]
    },
    {
      title: "열대야",
      category: "Concert",
      year: "2022",
      image: "https://raw.githubusercontent.com/2green-lee/Portfolio/dde4b078950d3eb0fcb261ee4f72cd9f4c0031b2/img3.jpg",
      contribution: "70%",
      location: "KT&G 상상마당 부산 13F 루프탑",
      support: "KT&G 상상마당 부산",
      cast: "From2020, Chilinkat, 이그린",
      objectPosition: "center",
      description: "도시에서 즐기는 한 여름 밤의 꿈. 도심의 건물 옥상에서 각양각색 인디 뮤지션의 음악을 즐긴다.",
      fullDescription: "도심 속 건물 옥상이라는 이색적인 공간에서 펼쳐지는 인디 음악 공연 시리즈입니다. '열대야'라는 테마에 맞춰 한여름 밤의 정취를 느낄 수 있는 아티스트 라인업과 공간 연출을 기획했습니다.\n\n관객들에게 일상 속 특별한 휴식을 선사하며, 지역 문화 공간의 활용도를 높이는 성공적인 사례를 만들었습니다. 기획부터 운영까지 전 과정을 주도하며 프로젝트의 완성도를 높였습니다.",
      role: {
        title: "담당 업무",
        items: [
          "Planning: 프로젝트 기획서 작성\n콘셉트 수립 및 협업 파트너 대상 제안",
          "Booking: 아티스트 및 공연/행사 장소 섭외\n일정 및 조건 협의",
          "Promotion: 온라인 홍보 전략 수립 및 실행\n오프라인 프로모션 기획 및 운영",
          "Production: 홍보물 및 콘텐츠 제작\n온·오프라인 홍보 자료 관리",
          "Operation: 행사 진행 및 운영 관리"
        ]
      },
      results: [
        "시민들이 주말 저녁에 향유할 수 있는 접근성 높은 공연 콘텐츠 기획 및 제공 -> 티켓 판매 전석 매진 달성",
        "공간 및 브랜드 협업을 통한 프로젝트 운영 효율 및 관객 경험 강화 -> KT&G 상상마당 루프탑 공간 대관 \n와인·핑거푸드 등 연계 프로모션 제공",
        "다채널 홍보를 통한 공연 인지도 확산 -> 상상마당 부산 및 HAO 공식 인스타그램을 활용한 온라인 홍보 진행 \n배너 및 공연 홍보 영상 제작·배포"
      ],
      images: [
        "https://raw.githubusercontent.com/2green-lee/Portfolio/7a0e467437190b36440c7c409f7d07a665b98d8d/Img%2031.jpg",
        "https://raw.githubusercontent.com/2green-lee/Portfolio/7a0e467437190b36440c7c409f7d07a665b98d8d/Img%2032.jpg",
        "https://raw.githubusercontent.com/2green-lee/Portfolio/7a0e467437190b36440c7c409f7d07a665b98d8d/Img%2033.jpg",
        "https://raw.githubusercontent.com/2green-lee/Portfolio/7a0e467437190b36440c7c409f7d07a665b98d8d/img%2034.jpg",
        "https://raw.githubusercontent.com/2green-lee/Portfolio/7a0e467437190b36440c7c409f7d07a665b98d8d/img%2035.jpg",
        "https://raw.githubusercontent.com/2green-lee/Portfolio/7a0e467437190b36440c7c409f7d07a665b98d8d/img%2036.jpg",
        "https://raw.githubusercontent.com/2green-lee/Portfolio/7a0e467437190b36440c7c409f7d07a665b98d8d/img%2037.jpg",
        "https://raw.githubusercontent.com/2green-lee/Portfolio/7a0e467437190b36440c7c409f7d07a665b98d8d/img%2038.jpg"
      ]
    },
    {
      title: "오후의 향기",
      category: "Concert",
      year: "2021",
      image: "https://raw.githubusercontent.com/2green-lee/Portfolio/dde4b078950d3eb0fcb261ee4f72cd9f4c0031b2/img2.jpg",
      contribution: "70%",
      location: "파나카 B",
      support: "부산문화재단",
      cast: "모멘츠유미, 이공이공, 오느린윤혜린",
      objectPosition: "top",
      description: "평화로운 일요일 오후, 차한잔과 함께 관람할 수 있는 힐링 공연. 아티스트가 직접 만든 향과 음악을 통해 공감각적 형태 공연을 향유한다.",
      fullDescription: "평화로운 일요일 오후, 차 한 잔과 함께 즐기는 힐링 공연 시리즈입니다. 아티스트가 직접 조향한 향기와 음악을 결합하여 관객들에게 공감각적인 경험을 선사하는 것을 목표로 했습니다.\n\n부산 지역의 소규모 편성 아티스트들에게 무대 기회를 제공하고, 아티스트의 정체성이 담긴 굿즈 제작을 통해 공연의 가치를 확장했습니다. 기획부터 제작, 홍보, 현장 운영까지 전 과정을 주도하며 따뜻한 감성의 브랜드 공연을 구축했습니다.",
      role: {
        title: "담당 업무",
        items: [
          "Planning: 기획서 작성\n프로젝트 전체 콘셉트 수립",
          "Booking: 출연 아티스트 섭외\n공연 베뉴(공간) 섭외 및 일정 조율",
          "Promotion: 인스타그램 기반 홍보 기획 및 운영\n라이브 영상 촬영 및 콘텐츠 활용",
          "Production: 메이킹·라이브 영상 제작 및 유통"
        ]
      },
      results: [
        "아티스트 섭외 및 공연 전석 매진",
        "콘텐츠 및 굿즈 제작 -> 티켓, 엽서, 우표 제작\n라이브 클립 영상 5편 제작·배포",
        "온라인 홍보 활성화 및 오프라인 홍보 -> 인스타그램 홍보\n현수막·포스터 등 오프라인 홍보물 제작 및 배포"
      ],
      images: [
        "https://raw.githubusercontent.com/2green-lee/Portfolio/e7d84bbdc228906326e2645347b5f44ad1a75293/img%2011.jpg",
        "https://raw.githubusercontent.com/2green-lee/Portfolio/e7d84bbdc228906326e2645347b5f44ad1a75293/img%2012.jpg",
        "https://raw.githubusercontent.com/2green-lee/Portfolio/e7d84bbdc228906326e2645347b5f44ad1a75293/img%2013.jpg",
        "https://raw.githubusercontent.com/2green-lee/Portfolio/e7d84bbdc228906326e2645347b5f44ad1a75293/img%2014.jpg",
        "https://raw.githubusercontent.com/2green-lee/Portfolio/2337ca8c54dd5f019a4869caceaea3d6036c6e12/img%2015.jpeg",
        "https://raw.githubusercontent.com/2green-lee/Portfolio/2337ca8c54dd5f019a4869caceaea3d6036c6e12/img%2016.jpeg",
        "https://raw.githubusercontent.com/2green-lee/Portfolio/2337ca8c54dd5f019a4869caceaea3d6036c6e12/img%2017.jpeg",
        "https://raw.githubusercontent.com/2green-lee/Portfolio/2337ca8c54dd5f019a4869caceaea3d6036c6e12/img%2018.JPG"
      ]
    }
  ],
  introduction: "즐거운 일탈의 경험을 기획하는 기획자 이근일입니다.",
  education: {
    name: "부산대학교",
    period: "2013 - 2021",
    major: "항공우주공학 & 예술문화영상학"
  },
  certificates: [
    { title: "TOEIC SPEAKING", subtitle: "AL (Advanced Low)", score: "AL (Advanced Low)", rating: "Level 9/11", ratio: 9/11 },
    { title: "TOEIC", subtitle: "830", score: "830", rating: "830/990", ratio: 830/990 },
    { title: "워드프로세서", score: "단일 등급" },
    { title: "운전면허증", score: "1종보통" }
  ],
  workExperience: [
    {
      company: "퀸즈스마일",
      tags: "기획/운영 · 인턴/수습 · PM(프로젝트매니저)",
      period: "2024.05 ~ 2024.10",
      desc: [
        "국내외 페스티벌 및 공연 기획 및 운영",
        "워터밤, 펜타포트 등 대형 페스티벌 현장 운영 참여 및 실무 지원",
        "자사 플랫폼 UX/UI 개선 프로젝트 참여 (개발팀 협업)",
        "공연 및 이벤트 운영 관련 자료 정리 및 내부 공유 문서 제작",
        "고객 서비스 채널 운영 및 문의 대응 프로세스 관리"
      ]
    },
    {
      company: "드림씨어터",
      tags: "고객서비스 · 아르바이트 · 하우스어텐던트",
      period: "2019.10 ~ 2022.05",
      desc: [
        "대형 라이선스 공연 관객 서비스 및 현장 운영 지원",
        "특이사항 및 현장 돌발 이슈 해결 및 대응",
        "공연장 안전 관리 및 운영 프로세스 이행"
      ]
    }
  ],
  activities: [
    { 
      title: "광고·마케팅 동아리 CREATOR", 
      period: "2019.03 ~ 2021.02", 
      org: "부산대학교",
      desc: ["영상 콘텐츠 및 카피라이팅 기획/제작", "마케팅 콘텐츠 기획 및 실행 경험", "공모전 수상"] 
    },
    { 
      title: "청년 UNIVERSITY 기획자 양성 프로그램", 
      period: "2021.06 ~ 2021.12", 
      org: "부산문화재단",
      desc: ["프로젝트 기획–운영–성과 분석 전 과정 수행", "결과 보고서 작성 및 발표"] 
    },
    { 
      title: "아트모아 기자단 2기", 
      period: "2022.09 ~ 2022.12", 
      org: "예술경영지원센터",
      desc: ["산업 리서치 및 전문가 인터뷰 기획/진행", "문화산업 관련 콘텐츠 작성 및 인사이트 도출"] 
    },
    { 
      title: "파나카노트 공연 기획 PD", 
      period: "2021", 
      org: "복합문화공간",
      desc: ["공연 기획 및 음향 총괄"] 
    },
    { 
      title: "한일청년 교류회", 
      period: "2019.03 ~ 2021.02", 
      org: "부산 한일문화교류협회",
      desc: ["한일 대학생 교류 프로그램 기획 및 운영 참여", "해외 프로그램 봉사활동"] 
    }
  ]
};

// Help initialize database and folders in writable /tmp space
function initializeEnvironment() {
  const originalDbPath = path.join(process.cwd(), "data", "db.json");

  // Create writable DB directory in /tmp
  if (!fs.existsSync(DB_DIR_TMP)) {
    fs.mkdirSync(DB_DIR_TMP, { recursive: true });
  }

  // Seed DB with existing configuration from workspace or fallback to default
  if (!fs.existsSync(DB_PATH)) {
    if (fs.existsSync(originalDbPath)) {
      try {
        console.log(`Seeding DB from workspace source: ${originalDbPath}`);
        fs.copyFileSync(originalDbPath, DB_PATH);
      } catch (e: any) {
        console.error(`Failed to copy existing database: ${e.message}`);
        fs.writeFileSync(DB_PATH, JSON.stringify(INITIAL_DATA, null, 2), "utf-8");
      }
    } else {
      console.log("Seeding DB with initial fallback data");
      fs.writeFileSync(DB_PATH, JSON.stringify(INITIAL_DATA, null, 2), "utf-8");
    }
  }

  // Ensure uploads directory exists in /tmp
  if (!fs.existsSync(UPLOADS_DIR)) {
    fs.mkdirSync(UPLOADS_DIR, { recursive: true });
  }
}

initializeEnvironment();

async function startServer() {
  const app = express();
  
  // Standard body parsers
  app.use(express.json({ limit: "50mb" }));
  app.use(express.urlencoded({ limit: "50mb", extended: true }));

  // Static directory for custom uploads
  app.use("/uploads", express.static(UPLOADS_DIR));

  // --- API Routes ---
  
  // Get portfolio database
  app.get("/api/portfolio", (req, res) => {
    try {
      if (fs.existsSync(DB_PATH)) {
        const data = fs.readFileSync(DB_PATH, "utf-8");
        return res.json(JSON.parse(data));
      }
      return res.json(INITIAL_DATA);
    } catch (err: any) {
      console.error("Failed to read database:", err);
      return res.status(500).json({ error: "Failed to load dynamic portfolio data." });
    }
  });

  // Save portfolio database
  app.post("/api/portfolio", (req, res) => {
    try {
      const data = req.body;
      if (!data || typeof data !== "object") {
        return res.status(400).json({ error: "Invalid data payload." });
      }
      
      // Always write to writable DB_PATH under /tmp
      fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2), "utf-8");

      // Try best-effort save to workspace/persistent path (if writable)
      try {
        const originalDbPath = path.join(process.cwd(), "data", "db.json");
        const originalDbDir = path.dirname(originalDbPath);
        if (!fs.existsSync(originalDbDir)) {
          fs.mkdirSync(originalDbDir, { recursive: true });
        }
        fs.writeFileSync(originalDbPath, JSON.stringify(data, null, 2), "utf-8");
        console.log("Successfully persisted save to workspace database destination.");
      } catch (e: any) {
        console.log(`Note: Best-effort workspace persistence skipped or failed (expected on read-only environments like Cloud Run): ${e.message}`);
      }

      return res.json({ success: true, message: "Portfolio successfully updated!" });
    } catch (err: any) {
      console.error("Failed to save database:", err);
      return res.status(500).json({ error: `Failed to persist changes: ${err.message || err}` });
    }
  });

  // Base64 file uploader
  app.post("/api/upload", (req, res) => {
    try {
      if (!req.body) {
        return res.status(400).json({ error: "Request body is empty or not parsed. Make sure Content-Type is application/json." });
      }
      const { fileName } = req.body;
      const fileData = req.body.fileData || req.body.fileContent;
      
      if (!fileName || !fileData) {
        const receivedKeys = req.body ? Object.keys(req.body).join(", ") : "none";
        return res.status(400).json({ error: `fileName and fileData (base64) are required. Received keys: ${receivedKeys}` });
      }

      // Check for base64 structure headers
      let matches = fileData.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);
      let buffer: Buffer;

      if (matches && matches.length === 3) {
        buffer = Buffer.from(matches[2], "base64");
      } else {
        // Fallback for raw base64 contents
        buffer = Buffer.from(fileData, "base64");
      }

      // Sanitize fileName to prevent path traversal
      const ext = path.extname(fileName) || ".png";
      const baseName = path.basename(fileName, ext).replace(/[^a-zA-Z0-9_\-]/g, "");
      const finalFileName = `${Date.now()}_${baseName}${ext}`;

      // Ensure directory exists
      if (!fs.existsSync(UPLOADS_DIR)) {
        fs.mkdirSync(UPLOADS_DIR, { recursive: true });
      }
      const destination = path.join(UPLOADS_DIR, finalFileName);
      
      fs.writeFileSync(destination, buffer);
      
      const fileUrl = `/uploads/${finalFileName}`;
      console.log(`Successfully uploaded: ${fileUrl}`);
      
      return res.json({ success: true, url: fileUrl });
    } catch (err: any) {
      console.error("Failed to upload file:", err);
      try {
        fs.appendFileSync(path.join(process.cwd(), "data", "error.log"), `[${new Date().toISOString()}] Upload Error: ${err.message}\n${err.stack}\n`);
      } catch (logErr) {}
      return res.status(500).json({ error: `Server failed to save the uploaded asset: ${err.message || err}` });
    }
  });

  // Health endpoint
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok" });
  });

  // Vite development mode integration vs production serving
  if (process.env.NODE_ENV !== "production") {
    console.log("Running in development mode (Vite Dev Middleware)");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    console.log("Running in production mode (Serving static build)");
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    // Serve SPA index.html for all unresolved routes
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  // Launch express server
  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server listening at http://localhost:${PORT}`);
  });
}

startServer();
