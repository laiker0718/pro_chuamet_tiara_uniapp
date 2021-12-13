<template>
    <view class="policy-content">
        <uni-transition mode-class="fade" :duration="500" :show="true" :styles="{'width': '100%', 'height': '100%'}">
            <view class="logo">
                <image class="logo-img" :src="logoSrc" mode="widthFix"></image>
            </view>
            
            <view class="title">个人信息处理规则 – 标准版</view>
            
            <view class="normal">
                “【CHAUMET】”品牌在中国大陆地区由【路威酩轩钟表珠宝商贸（上海）有限公司】，注册地址：【上海市静安区南京西路1266号恒隆广场1期1701】（以下称“【CHAUMET】”或“我们”）经营及经销。根据中华人民共和国相关法律法规，我们很荣幸且有义务提供有关依照中华人民共和国相关法律法规处理个人资料的信息。
            </view>
            <view class="normal">
                本个人信息处理规则（下称“处理规则”、“本规则”）旨在让用户（或称“您”）清楚地了解，我们会如何收集及使用您的信息，我们保护您的信息的决心，以及您拥有的管理自身信息和隐私的各种选择。
            </view>
            <view class="normal">
                本处理规则适用于我们向用户提供的网站、APP、社交应用小程序等线上渠道相关的产品和服务以及线下店铺提供产品和服务以及适用于与【CHAUMET】产品和服务有关的所有活动（例如：在线注册会员；在线购买及售后；参加品牌活动；推送产品和活动信息；发送活动邀请）等。同时，根据适用的法律法规更新要求或业务变化需求，我们将不时修改、更新本处理规则。
            </view>
            <view class="normal">
                最近更新日期：2021年【11】月【1】日。
            </view>
            <view class="normal">
                如果您有任何疑问、意见或建议，请按照下文第10条的联系方式与我们联系。
            </view>
            <view class="normal">
                本处理规则将帮助您了解以下内容：
            </view>
            <view class="normal">1、我们如何收集和使用您的个人信息</view>
            <view class="normal-notop">2、我们如何共享、转让、公开披露您的个人信息</view>
            <view class="normal-notop">3、我们如何保护您的个人信息</view>
            <view class="normal-notop">4、您如何管理您的个人信息</view>
            <view class="normal-notop">5、我们如何处理未成年人的个人信息</view>
            <view class="normal-notop">6、您的个人信息如何在全球范围转移</view>
            <view class="normal-notop">7、我们如何保存您的个人信息</view>
            <view class="normal-notop">8、COOKIES政策</view>
            <view class="normal-notop">9、本规则如何更新</view>
            <view class="normal-notop">10、如何联系我们</view>
            <view class="normal">
                请在使用我们的服务前，仔细阅读并了解本处理规则。如果您选择使用我们的服务，即意味着您完全理解本处理规则的全部内容，并同意我们根据本处理规则收集、存储、使用、加工、传输、提供、公开、删除等您的个人信息。若您不同意本处理规则或其任何一部分，请立即停止使用我们的服务。
            </view>
            <view class="normal">
                1. 我们如何收集和使用您的个人信息
            </view>
            <view class="normal">
                a) 我们向您提供服务所必需的信息：
            </view>
            <view class="normal">
                -	在您注册账户或申请会员时，您提供姓名、性别、手机号码、电子邮件地址、所在地及其他补充完善信息；
            </view>
            <view class="normal-notop">
                -	在您申请“参加品牌活动、推送产品和活动信息、发送活动邀请”的服务时，您提供姓名、手机号码、邮箱地址；
            </view>
            <view class="normal-notop">
                -	在您寻找附近的店铺时，您提供您的地理位置；
            </view>
            <view class="normal-notop">
                -	在您进行支付时，您提供某些财务信息（您的银行账户或信用卡信息及支付记录）；
            </view>
			<view class="normal-notop">
				-	您订购产品及为实现对您订购的产品的配送，您提供订购人信息、收货人姓名、收货地址、邮政编码、收货人联系电话以及，您在使用我们的售后服务时，您提供售后服务相关的姓名、性别、手机号码、寄送地址、产品信息、发票及订购单信息等。您可以通过我们的网站为其他人订购商品或服务，或者为他人的产品预约售后服务，您需要提供该实际订购人/使用人的前述个人信息。向我们提供这些个人信息之前，您需确保您已经取得其授权同意；
			</view>
			<view class="normal-notop">
			    -	在您关注/订阅我们的社交应用时，您提供社交应用账户信息、昵称、头像信息；
			</view>
			<view class="normal-notop">
			    -	在您使用我们的移动互联网应用程序时，您提供以下信息：
			</view>
			<view class="normal-notop">
			    	设备信息：我们会根据您在软件安装及/或使用中授予的具体权限，接收并记录您所使用的设备相关信息（设备型号、操作系统版本、设备设置、唯一设备标识符、设备环境信息）、设备所在位置相关信息（IP 地址、GPS位置以及能够提供相关信息的WLAN接入点传感器信息）。如果您在安装及/或使用过程中拒绝授予我们相应权限的，我们并不会记录您上述对应的信息。
			</view>
			<view class="normal-notop">
					服务日志信息：当您使用我们的移动应用提供的产品或服务时，基于数据统计、有关广告及营销效果评估目的，我们会收集您对我们服务的详细使用情况，包括搜索查询内容、IP地址、浏览器的类型、电信运营商、使用的语言、访问日期和时间及您访问、浏览、停留、下单操作的网页记录。
			</view>
			<view class="normal-notop">
			    	其他系统和设备权限信息：我们会在您开启软件前及/或使用中向您申请授予的具体设备和系统权限，并告知您相应的使用目的。如果您拒绝授予我们相应权限的，我们并不会记录您对应的信息；
			</view>
			<view class="normal-notop">
			    -	在您与我们的客服人员联系、交流时，或者在您向我们发送信息、留言时，您提供姓名、性别、手机号码、电子邮件地址、留言及咨询内容，以及您选择提供的任何信息；
			</view>
			<view class="normal-notop">
				-	其他信息。您还可以选择在填写问卷、进行搜索、更新或添加“【CHAUMET】”账户信息、回答调查、参与优惠活动或使用“【CHAUMET】”官方渠道的其他功能时，向我们提供其他信息。
			</view>
            <view class="normal">
                您同意为给您提供更好的服务，出于下述 b) 和 c)中所载之目的，我们可收集及处理其他资料：
            </view>
            <view class="normal">
                b)	进行电商网站数据统计分析与用户特征分析，同样是通过第三方提供的服务。我们将在您授权的范围内使用相关个人信息，并依法采取必要的安全保护措施。第三方数据处理必须符合中国法律、法规的相关规定，以响应“【CHAUMET】”提交的事先检验请求。
            </view>
            <view class="normal">
                c)	为提供个性化销售服务或向用户自动化推荐产品、发送信息，例如但不限于以下方式：个人购物服务、在线推荐服务、免费协助服务和礼宾服务，通过电话、信件、电子邮件、短讯和多媒体讯息、社交网络和即时通讯等发送有关品牌作品、独家销售和活动、或“【CHAUMET】”组织或参加的类似活动的消息（包括参加此类活动的潜在邀请），以及用于发送评估提供的服务所达到的满意程度之问卷。如果您不愿接受此类消息的，可以按照收到的消息中提供的方式退订。
            </view>
			<view class="normal">
			    其他资料包括：
			</view>
			<view class="normal">
			    -	到店、参加活动期间或在线购买时收集的数据，包括Wi-Fi系统使用情况、生日、年龄范围、家庭活动日、职业、爱好、购物记录、设备信息、服务日志信息、特殊社交网络的使用或社交网络ID、电话号码、电子邮件地址、照片、国籍、性别、在我们管理的客户关系管理系统中的注册方式及日期、语言、喜爱产品的类别、购买产品的详细情况、规格、价格、折扣、统计支出水平、放弃的购物车、服务使用方式、关于店内服务的偏好、对接触活动的响应、客户参加的活动、选购但未实际购买的产品；
			</view>
			<view class="normal-notop">
			    -	在浏览或使用应用程序时收集的资料，包括用Cookies 或类似技术记录的行为数据，具体说明见下文第8条COOKIES政策。 
			</view>
            <view class="normal-notop">
                d)	通过第三方收集的信息
            </view>
            <view class="normal">
                我们可能会收集其他方在使用我们的网站时提供的关于您的信息（包括个人信息），或从其他渠道获取信息，并与我们通过网站服务收集的信息整合。我们不会控制、监督或回应提供您的信息的第三方如何处理您的个人数据，任何发给我们的关于披露您的个人信息的信息请求应直接发送给此类第三方。我们可能会收集其他方在使用我们的网站时提供的关于您的信息（包括个人信息），或从其他渠道获取信息，并与我们通过网站服务收集的信息整合。我们不会控制、监督或回应提供您的信息的第三方如何处理您的个人数据，任何发给我们的关于披露您的个人信息的信息请求应直接发送给此类第三方。
            </view>
            <view class="normal">
                -	第三方服务。为确认交易状态及为您提供售后与争议解决服务，我们会通过您基于交易所选择的交易方式、支付机构、物流公司收集与交易进度相关的您的交易、支付、物流信息，或将您的交易信息共享给上述服务提供者；
            </view>
            <view class="normal-notop">
                -	其他来源。在适用法律允许的情况下，我们可以从第三方服务提供商和/或合作伙伴处获得您的额外信息，如人口统计数据或欺诈侦测信息，并将此类信息与我们所拥有的您的信息整合。例如，我们可以从服务供应商（身份验证服务）处获得背景调查信息结果（在必要时经您同意）或欺诈警告，用于防止欺诈和风险评估。我们可以通过合作伙伴获得您的信息以及您参与我们活动的信息，或您在合作伙伴广告网络的体验与互动信息。上述情况下，我们将要求第三方提供其个人信息来源合法的确认，并在您授权的范围内使用相关信息。
            </view>
            <view class="normal">
                为第1段a)款中所载之目的，如用户不提供个人数据， 我们无法继续提供所请求的包含通知、预订、预约、售后、咨询等服务在内的相关服务。
            </view>
			<view class="normal">
				为上述第1段b)款和c)款列明的目的，用户可自主选择是否免费提供资料。若拒绝提供此等资料，我们将无法继续实现所述目的。
			</view>
            <view class="normal">
                2.	我们如何共享、转让、公开披露您的个人信息
            </view>
            <view class="normal">
                a)	共享
            </view>
            <view class="normal-notop">
                我们不会与任何公司、组织和个人分享您的个人信息，但以下情况及其他您另行明确同意的情况除外：
            </view>
            <view class="normal-notop">
                （1）我们可能会根据法律法规规定，或按政府主管部门的强制性要求，对外共享您的个人信息；
            </view>
            <view class="normal-notop">
                （2）与我们的关联公司或业务伙伴共享：对于关乎我们的消费者的匿名的、经整合的信息，我们可能与我们的关联公司或我们的业务伙伴分享，例如用于趋势分析；
            </view>
            <view class="normal-notop">
                （3）此外，您的个人信息也可由以下公司处理：
            </view>
            <view class="normal-notop">
                -	由发送新闻邮件、营销材料和促销资讯的公司处理；
            </view>
            <view class="normal-notop">
                -	由负责顾客关怀服务的公司处理；
            </view>
            <view class="normal-notop">
                -	由负责网站数据统计分析和市场研究的公司处理；
            </view>
            <view class="normal-notop">
                -	提供协助或咨询服务（律师、会计师和审计师）的个人、公司、协会或专业人员；
            </view>
            <view class="normal-notop">
                -	由IT系统维护公司、数据处理公司处理。
            </view>
            <view class="normal-notop">
                我们将通过书面协议的方式与上述公司约定处理的目的、期限、处理方式、个人信息的种类、保护措施以及双方的权利和义务等，并对其个人信息处理活动进行监督。
            </view>
            <view class="normal">
                收集的数据也可由独立第三方数据控制方处理，例如：
            </view>
            <view class="normal-notop">
                -	管理信用卡支付服务与免税服务的公司；
            </view>
            <view class="normal-notop">
                -	为产品目录及/或产品提供运输服务/送货服务的公司；
            </view>
            <view class="normal-notop">
                -	根据适用的渠道，还包括第三方电商平台、媒体平台或社交平台。
            </view>
            <view class="normal-notop">
                作为独立第三方数据控制方处理个人资料的第三方完整名单，以及联系方式、处理目的、处理方式和个人信息的种类，您可以随时通过本规则第10条公示的联系方式联系我们获取。
            </view>
            <view class="normal">
                （4）我们通过接入第三方代码、插件、接口的方式将个人信息共享至第三方的情形说明如下：
            </view>
            <view class="normal">
                接入方式: SDK
            </view> 
            <view class="normal-notop">
                提供目的及场景描述: CCDB后台登陆短信验证码功能
            </view>
            <view class="normal-notop">
                提供的个人信息类型: 手机号
            </view>
            <view class="normal-notop">
                数据接收方的名称及联系方式: 阿里云
            </view>
			<view class="normal">
			    名称: ECTrack
			</view> 
            <view class="normal">
                接入方式: SDK
            </view> 
            <view class="normal-notop">
                提供目的及场景描述: 通过EC小程序获取客户浏览信息
            </view>
            <view class="normal-notop">
                提供的个人信息类型: 社交网络ID
            </view>
            <view class="normal-notop">
                数据接收方的名称及联系方式: 上海径硕网络科技有限公司
            </view>
			<view class="normal">
			    名称: JINGsales
			</view> 
            <view class="normal">
                接入方式: SDK、API
            </view> 
            <view class="normal-notop">
                提供目的及场景描述: 客户关系管理、员工身份验证、员工操作日志
            </view>
            <view class="normal-notop">
                提供的个人信息类型: 通过企业微信获取：用户的社交网络ID，用户的手机号，员工的姓名、手机号、职位、部门、邮箱；通过SDK获取：员工在JINGsales工具中的行为
            </view>
            <view class="normal-notop">
                数据接收方的名称及联系方式: 上海径硕网络科技有限公司
            </view>
            <view class="normal">
                对我们与之共享个人信息的公司、组织和个人，我们会与其签署严格的保密协定，要求他们按照我们的说明以及其他任何相关的保密和安全措施来处理个人信息。此外，我们还会开展个人信息保护影响评估，仅在评估合格后方才开始共享行为。
            </view>
            <view class="normal">
                b)	转让
            </view>
            <view class="normal-notop">
                我们不会将您的个人信息转让给任何公司、组织和个人，但以下情况除外：
            </view>
            <view class="normal-notop">
                （1）在获取明确同意的情况下转让：获得您的明确同意后，我们会向其他方转让您的个人信息；
            </view>
            <view class="normal-notop">
                （2）在涉及合并、分立、清算或破产时，如涉及到个人信息转让，我们会在要求新的持有您个人信息的公司、组织继续受此处理规则的约束，否则我们将要求该公司、组织重新向您征求授权同意。
            </view>
            <view class="normal">
                c)	公开披露
            </view>
            <view class="normal-notop">
                我们仅会在以下情况下，公开披露您的个人信息：
            </view>
            <view class="normal-notop">
                （1）获得您明确同意后；
            </view>
            <view class="normal-notop">
                （2）基于法律的披露：在法律、法律程序、诉讼或政府主管部门强制性要求的情况下，我们可能会公开披露您的个人信息。
            </view>
            <view class="normal">
                3.	我们如何保护您的个人信息
            </view>
            <view class="normal">
                a)	我们致力于保护您的个人信息。我们采用了恰当的技术措施和组织设置，包括加密，以保护您的个人信息和安全，定岗定责，并定期检查及合规审计。我们结合了物理和信息技术安全控制措施保护您的个人信息，包括访问控制，从而限制和管理您个人信息和数据的处理、管理，和使用方式。我们同样确保我们的员工得到保护个人信息方面的适当培训。
            </view>
            <view class="normal">
                b)	您的账户均有安全保护功能，请妥善保管您的账户及密码信息。我们将通过向其它服务器备份、对您密码进行加密等安全措施最大程度确保您的信息不丢失，不被滥用和变造。尽管有前述安全措施，但同时也请您理解在信息网络上不存在“完善的安全措施”。我们无法承诺您数据及信息的完全安全，尤其提醒您远离电信及网络诈骗，远离网络黑灰产，妥善保管好自己的金融账户及网络账号安全，免受不法行为侵害。
            </view>
            <view class="normal">
                c)	为了应对个人信息安全事件，我们将按照法律法规的要求，依法履行汇报及通知义务，包括：安全事件的基本情况和可能的影响、我们已采取或将要采取的处置措施、您可自主防范和降低风险的建议、对您的补救措施等。在适用的前提下，我们将及时将事件相关情况以邮件、信函、电话、推送通知等方式告知您，难以逐一告知个人信息主体时，我们会采取合理、有效的方式发布公告。同时，我们还将按照监管部门要求，主动上报个人信息安全事件的处置情况。
            </view>
            <view class="normal">
                4.	您如何管理您的个人信息
            </view>
            <view class="normal">
                a)	查询、复制、更改、删除您的个人信息。您有权查询、复制、更改、删除您的个人信息，法律法规规定的例外情况除外。符合法律规定的前提下，您还有请求转移个人信息的权利。要行使前述权利或要求我们解释说明，请通过本规则第10条公示的联系方式联系我们进行操作。
            </view>
            <view class="normal-notop">
                b)	撤销同意和更改同意的范围
            </view>
            <view class="normal-notop">
                我们基于同意处理您的个人信息，您可以随时通过更改您的账户设置、向我们发送退订信息或通过本规则第10条公示的联系方式联系我们来撤销您的同意，同时说明您要撤销哪一项同意。除法律另有规定外，当您撤销同意后，我们将不再处理相应的个人信息。但该决定不会影响此前基于您的授权而开展的个人信息处理。
            </view>
            <view class="normal-notop">
                对于您选择提交的信息的收集和使用，您可以更改您的授权同意范围。您可以通过与我们联系的方式实现。
            </view>
            <view class="normal-notop">
                c)	注销您的相关账户
            </view>
            <view class="normal-notop">
                若您有注册账户，您可以随时通过届时适用的个人信息处理规则披露的联系方式联系我们进行操作，我们将在15个工作日内回复您的注销的请求。
            </view>
            <view class="normal-notop">
                在注销账户之后，我们将停止为您提供基于该账户的产品或服务，并依据您的要求，删除或匿名化您的个人信息，法律法规另有规定的除外。
            </view>
            <view class="normal">
                5.	我们如何处理儿童（指未满14周岁的未成年人）的个人信息
            </view>
            <view class="normal">
                我们的产品或服务，以及对应的网站，不以儿童为目标人群。我们不会未经儿童监护人的同意而收集儿童的任何个人信息。
            </view>
            <view class="normal-notop">
                如果您是儿童，请不要向我们提供任何您的个人信息。如果您是儿童，但自愿且必须使用我们的产品或服务的，烦请您务必让您的监护人仔细阅读本规则，并在征得您的监护人同意的前提下使用我们的产品或服务，并向我们提供个人信息。
            </view>
            <view class="normal-notop">
                如果我们发现自己在未事先获得可证实的儿童监护人同意的情况下收集了儿童的个人信息，则会依法删除相关数据。
            </view>
            <view class="normal">
                6.	您的个人信息如何在全球范围转移
            </view>
            <view class="normal">
                为了确保全球经营策略、服务标准及网络系统的一致性等目的，我们需要向相关实体跨境提供您的个人信息，包括【CHAUMET】、其母公司、子公司、关联公司、同一控制下的公司、或与【CHAUMET】同一个集团旗下的公司。关于这些实体的具体名字及联系方式等信息，您可以随时通过本规则第10条公示的联系方式联系我们获取。
            </view>
            <view class="normal-notop">
                我们会依法履行必要的程序，并采取必要措施保障接收方达到适用的法律法规规定的保护标准。若根据适用的法律有明确的要求，我们将对个人信息跨境传输采取安全评估、认证或签署标准合同，并根据适用的法律决定是否继续跨境传输您的个人信息，以及是否采取脱敏技术措施。
            </view>
            <view class="normal">
                7.	数据保存期
            </view>
            <view class="normal">
                出于第1段a)款所载之目的而收集的数据将由【CHAUMET】保存，保存期为履行合同所需的期限，且需提供法律保障和传统保障，或遵守有关数据保存的强制性法律条款。
            </view>
            <view class="normal-notop">
                为第1段b)款和c) 款所载之目的而收集的数据，将保存至用户撤回对我们处理其个人数据的同意或请求删除或我们的处理目的已经实现为止。
            </view>
            <view class="normal">
                8.	COOKIES政策
            </view>
            <view class="normal">
                对于“【CHAUMET】”官方渠道的使用者，请注意，我们可以在您的计算机上存入“Cookies”，以便对您进行识别。Cookies 是指在浏览期间从一个服务器计算机上发送的小型数据文本档案。Cookies通常储存在计算机硬盘上，网站用 Cookies 来模拟与网站之间的持续连接。我们已经采取了相关的安全措施，以防止未获准许地查阅用户的数据。但是，用户确认，我们并不能控制电子通信设施（包括互联网）上的数据转移。因此，我们不会就互联网上发生的该等数据的安全漏洞或未获准许的披露或使用承担任何责任。您可以将您的浏览器设置成拒绝接受 Cookies，但这样做可能会使您无法充分利用我们的服务。
            </view>
            <view class="normal">
                9.	本规则如何更新
            </view>
            <view class="normal">
                本规则在页首载明的日期更新。
            </view>
            <view class="normal-notop">
                当适用的法律政策发生变更，或者我们的产品或服务功能发生重大变化的，我们的处理规则可能变更。但是，未经您明确同意，我们不会削减您按照本规则所应享有的权利。
            </view>
            <view class="normal-notop">
                对于本规则的重大变更，我们会提供显著的通知（包括会通过电子邮件、站内信等方式发送通知，或者页面弹窗的方式，等等）。
            </view>
            <view class="normal">
                10.	如何联系我们
            </view>
            <view class="normal">
                如您对本规则的内容，或对我们如何处理您的个人信息，有任何疑问、意见、建议、担忧、投诉或举报，请按照如下方式联系我们：
            </view>
            <view class="normal">
                （1）个人信息保护负责人联系方式：【 cninfo@lvmhwatchjewelry.com】
            </view>
			<view class="normal">
			    （2）客服电话：【 4006081780】
			</view>
            <view class="normal-notop">
                我们会在15个工作日内响应您的请求，并依据本规则及法律法规处理您的请求。
            </view>
            
            <view class="privacy-gap"></view>

            <image class="btn-close" :src="btnCloseSrc" @click="onBtnClose" mode="widthFix"></image>
        </uni-transition>
    </view>
</template>

<script>
    import {
        url_logo_blue,
        url_logo_white,

        url_rsvp_input_btn_close,
    } from '@/common/globaldata.js'

    import {
        g_logo_ratio,
    } from '@/common/const.js'

    export default {
        name: 'com-privacy',
        data() {
            return {
                width: getApp().globalData.wWidth,
                height: getApp().globalData.wHeight,

                logoSrc: url_logo_blue,
                logoRatio: g_logo_ratio,

                btnCloseSrc: url_rsvp_input_btn_close,
            }
        },
        beforeCreate() {},
        created() {},
        beforeMount() {},
        mounted() {},
        beforeUpdate() {},
        updated() {},
        beforeDestroy() {},
        destroyed() {},
        methods: {
            onBtnClose() {
                this.$emit('onBtnClose')
            }
        }
    }
</script>

<style>
    .policy-content {
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        background-color: #05216A;
        overflow-y: scroll;
        overflow-x: hidden;
        
        font-size: 14px;
        text-align:justify;
        text-align-last:left;
        
        white-space: normal;
        word-break: break-word;
        word-wrap: break-word;
    }

    .logo {
        width: 100%;
        background-color: #FFFFFF;
    }

    .logo-img {
        width: 40%;
        margin-left: 30%;
        margin-top: 40px;
        margin-bottom: 10px;
    }

    .title, .normal, .normal-notop, .normal-bold {
        width: 80%;
        margin-left: 10%;
    }
    
    .title {
        font-size: 20px;
        font-weight: bold;
        
        display: flex;
        justify-content: center;
        margin-top: 20px;
    }
    
    .normal {
        margin-top: 20px;
    }
    
    .text {
        font-size: 12px;
    }
    
    .text-bold {
        font-weight: bold;
    }
    
    .padding {
        width: 77%;
        margin-left: 13%;
        display: flex;
    }
    
    .padding-title {
        width: 26px;
    }
    
    .padding-normal-notop {
        width: 100%;
        padding-left: 13px;
    }
    
    .padding-normal-noleft-notop {
        width: 100%;
    }
    
    .privacy-gap {
        height: 60px;
    }

    .btn-close {
        position: fixed;
        width: 14%;
        left: 43%;
        bottom: 3%;

        z-index: 10;
    }
</style>
