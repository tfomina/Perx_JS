import axios from "axios";
import { fetchPending, fetchSuccess, fetchError } from "./../actions";

const fetchDealers = async dealerIds => {
  return await axios(
    `https://jlrc.dev.perx.ru/carstock/api/v1/dealers/?id__in=${dealerIds}`
  );
};

export const fetch = (currentPage, itemsPerPage) => {
  return async dispatch => {
    dispatch(fetchPending());

    try {
      const url = `https://jlrc.dev.perx.ru/carstock/api/v1/vehicles/?state=active&hidden=false&group=new&page=${currentPage}&per_page=${itemsPerPage}`;

      const carResult = await axios(url, {
        headers: {
          "X-CS-Dealer-Id-Only": 1
        }
      });

      const dealerIds = (carResult.data || []).map(i => i.dealer);
      const uniqueSet = new Set(dealerIds);
      const uniqueDealerIds = [...uniqueSet];
      const uniqueDealerIdsString = uniqueDealerIds.join();

      const dealerResult = await fetchDealers(uniqueDealerIdsString);

      const cars = carResult.data.map(c => ({
        ...c,
        dealerInfo: dealerResult.data.find(d => c.dealer === d.id)
      }));

      dispatch(
        fetchSuccess({
          cars: cars,
          total: carResult.headers["x-total-count"]
        })
      );
    } catch (error) {
      dispatch(fetchError());
    }
  };
};
