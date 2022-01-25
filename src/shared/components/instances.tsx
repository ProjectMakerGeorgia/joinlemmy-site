import { Component } from "inferno";
import { Helmet } from "inferno-helmet";
import { i18n } from "../i18next";
import { instance_stats } from "../translations/instance_stats";
import { numToSI } from "../utils";

const title = i18n.t("join_title");

export class Instances extends Component<any, any> {
  constructor(props: any, context: any) {
    super(props, context);
  }

  header() {
    return (
      <i>
        {i18n.t("instance_totals", {
          instances: numToSI(instance_stats.crawled_instances),
          users: numToSI(instance_stats.total_users),
        })}
      </i>
    );
  }

  render() {
    let instances = instance_stats.instance_details;
    return (
      <div>
        <Helmet title={title}>
          <meta property={"title"} content={title} />
        </Helmet>
        <div class="container">
          <h1 class="is-marginless">{i18n.t("lemmy_servers")}</h1>
          {this.header()}
          <br />
          <br />
          <p>{i18n.t("choose_and_join")}</p>

          <div class="row">
            {instances.map(i => (
              <div class="card col-6">
                <header>
                  <div class="row">
                    <h4 class="col">{i.domain}</h4>
                    <h4 class="col text-right">
                      <i>
                        {numToSI(i.users_active_month)} {i18n.t("users")} /{" "}
                        {i18n.t("month")}
                      </i>
                    </h4>
                  </div>
                </header>
                <div class="is-center">
                  <img
                    class="join-banner"
                    src={i.icon || "/static/assets/images/lemmy.svg"}
                  />
                </div>
                <br />
                <p class="join-desc">{i.description}</p>
                <footer>
                  <a class="button primary" href={`https://${i.domain}`}>
                    {i18n.t("join")}
                  </a>
                </footer>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
}
