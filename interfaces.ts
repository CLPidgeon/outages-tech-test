export interface Outages {
  id: string;
  begin: string;
  end: string;
}

export interface SiteInfo {
  id: string;
  name: string;
}

export interface FormattedOutage {
  id: string;
  name: string;
  begin: string;
  end: string;
}
