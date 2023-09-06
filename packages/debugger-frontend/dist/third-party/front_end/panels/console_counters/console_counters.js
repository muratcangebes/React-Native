import*as e from"../../core/common/common.js";import*as s from"../../core/host/host.js";import*as o from"../../core/i18n/i18n.js";import*as t from"../../core/sdk/sdk.js";import*as n from"../../models/issues_manager/issues_manager.js";import*as r from"../../ui/components/icon_button/icon_button.js";import*as i from"../../ui/components/issue_counter/issue_counter.js";import*as a from"../../ui/legacy/legacy.js";const l={sErrors:"{n, plural, =1 {# error} other {# errors}}",sWarnings:"{n, plural, =1 {# warning} other {# warnings}}",openConsoleToViewS:"Open Console to view {PH1}",openIssuesToView:"{n, plural, =1 {Open Issues to view # issue:} other {Open Issues to view # issues:}}"},u=o.i18n.registerUIStrings("panels/console_counters/WarningErrorCounter.ts",l),c=o.i18n.getLocalizedString.bind(void 0,u);let d;class p{toolbarItem;consoleCounter;issueCounter;throttler;updatingForTest;constructor(){p.instanceForTest=this;const o=document.createElement("div");this.toolbarItem=new a.Toolbar.ToolbarItemWithCompactLayout(o),this.toolbarItem.setVisible(!1),this.toolbarItem.addEventListener("CompactLayoutUpdated",this.onSetCompactLayout,this),this.consoleCounter=new r.IconButton.IconButton,o.appendChild(this.consoleCounter),this.consoleCounter.data={clickHandler:e.Console.Console.instance().show.bind(e.Console.Console.instance()),groups:[{iconName:"cross-circle-filled",iconColor:"var(--icon-error)",iconHeight:"14px",iconWidth:"14px"},{iconName:"warning-filled",iconColor:"var(--icon-warning)",iconHeight:"14px",iconWidth:"14px"}]};const l=n.IssuesManager.IssuesManager.instance();this.issueCounter=new i.IssueCounter.IssueCounter,o.appendChild(this.issueCounter),this.issueCounter.data={clickHandler:()=>{s.userMetrics.issuesPanelOpenedFrom(s.UserMetrics.IssueOpener.StatusBarIssuesCounter),a.ViewManager.ViewManager.instance().showView("issues-pane")},issuesManager:l,displayMode:"OnlyMostImportant"},this.throttler=new e.Throttler.Throttler(100),t.TargetManager.TargetManager.instance().addModelListener(t.ConsoleModel.ConsoleModel,t.ConsoleModel.Events.ConsoleCleared,this.update,this),t.TargetManager.TargetManager.instance().addModelListener(t.ConsoleModel.ConsoleModel,t.ConsoleModel.Events.MessageAdded,this.update,this),t.TargetManager.TargetManager.instance().addModelListener(t.ConsoleModel.ConsoleModel,t.ConsoleModel.Events.MessageUpdated,this.update,this),l.addEventListener("IssuesCountUpdated",this.update,this),this.update()}onSetCompactLayout(e){this.setCompactLayout(e.data)}setCompactLayout(e){this.consoleCounter.data={...this.consoleCounter.data,compact:e},this.issueCounter.data={...this.issueCounter.data,compact:e}}static instance(e={forceNew:null}){const{forceNew:s}=e;return d&&!s||(d=new p),d}updatedForTest(){}update(){this.updatingForTest=!0,this.throttler.schedule(this.updateThrottled.bind(this))}get titlesForTesting(){const e=this.consoleCounter.shadowRoot?.querySelector("button");return e?e.getAttribute("aria-label"):null}async updateThrottled(){const e=t.ConsoleModel.ConsoleModel.allErrors(),s=t.ConsoleModel.ConsoleModel.allWarnings(),o=n.IssuesManager.IssuesManager.instance(),r=o.numberOfIssues(),u=e=>0===e?void 0:`${e}`,d=c(l.sErrors,{n:e}),p=c(l.sWarnings,{n:s}),h=[u(e),u(s)];let C="";e&&s?C=`${d}, ${p}`:e?C=d:s&&(C=p);const g=c(l.openConsoleToViewS,{PH1:C}),m=this.consoleCounter.data;this.consoleCounter.data={...m,groups:m.groups.map(((e,s)=>({...e,text:h[s]}))),accessibleName:g},a.Tooltip.Tooltip.install(this.consoleCounter,g),this.consoleCounter.classList.toggle("hidden",!(e||s));const M=i.IssueCounter.getIssueCountsEnumeration(o),I=`${c(l.openIssuesToView,{n:r})} ${M}`;a.Tooltip.Tooltip.install(this.issueCounter,I),this.issueCounter.data={...this.issueCounter.data,accessibleName:I},this.issueCounter.classList.toggle("hidden",!r),this.toolbarItem.setVisible(Boolean(e||s||r)),a.InspectorView.InspectorView.instance().toolbarItemResized(),this.updatingForTest=!1,this.updatedForTest()}item(){return this.toolbarItem}static instanceForTest=null}var h=Object.freeze({__proto__:null,WarningErrorCounter:p});export{h as WarningErrorCounter};