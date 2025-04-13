@IsTest
private class DocumentChecklistControllerTest {
    @IsTest
    static void shouldGetChecklistRecords() {
        Opportunity opp = new Opportunity(Name='Test', StageName='New', CloseDate=System.today());
        insert opp;

        Document_Checklist__c dc = new Document_Checklist__c(Name='Purchase Agreement', Opportunity__c = opp.Id);
        insert dc;

        List<Document_Checklist__c> dcs = DocumentChecklistController.getChecklistRecords(opp.Id);
        System.assertEquals(1, dcs.size(),'size failed');

        DocumentChecklistController.saveChecklistRecords(dcs);
    }
}