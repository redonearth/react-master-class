import styled from 'styled-components';

const PriceInfo = styled.div`
  display: flex;
  justify-content: space-between;
  background-color: rgba(0, 0, 0, 0.5);
  padding: 10px 20px;
  border-radius: 10px;
`;

const PriceInfoItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  span:first-child {
    font-size: 10px;
    font-weight: 400;
    text-transform: uppercase;
    margin-bottom: 5px;
  }
`;

interface PriceProps {
  priceData?: IPriceData;
}

interface IPriceData {
  ath_date: string;
  ath_price: number;
  market_cap: number;
  market_cap_change_24h: number;
  percent_change_1h: number;
  percent_change_1y: number;
  percent_change_6h: number;
  percent_change_7d: number;
  percent_change_12h: number;
  percent_change_15m: number;
  percent_change_24h: number;
  percent_change_30d: number;
  percent_change_30m: number;
  percent_from_price_ath: number;
  price: number;
  volume_24h: number;
  volume_24h_change_24h: number;
}

function Price({ priceData }: PriceProps) {
  return (
    <>
      {!priceData ? (
        'No Data'
      ) : (
        <PriceInfo>
          <PriceInfoItem>
            <span>Market Cap:</span>
            <span>${priceData.market_cap}</span>
          </PriceInfoItem>
          <PriceInfoItem>
            <span>All Time High:</span>
            <span>${priceData.ath_price.toFixed(3)}</span>
            <span>{priceData.ath_date}</span>
          </PriceInfoItem>
          <PriceInfoItem>
            <span>Volume (24h):</span>
            <span>${priceData.volume_24h}</span>
          </PriceInfoItem>
        </PriceInfo>
      )}
    </>
  );
}

export default Price;
