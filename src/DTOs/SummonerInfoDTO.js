class SummonerInfoDTO {
    accountId;
    profileIconId;
    revisionDate;
    id;
    puuid;
    summonerLevel;
  
    constructor(data) {
      this.accountId = data.accountId;
      this.profileIconId = data.profileIconId;
      this.revisionDate = data.revisionDate;
      this.id = data.id;
      this.puuid = data.puuid;
      this.summonerLevel = data.summonerLevel;
    }
  }
  