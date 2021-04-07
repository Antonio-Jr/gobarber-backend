import IParseMailTemplateDTO from '../dtos/IParseMailTemplateDTO';
import IMailTemplateProvider from '../interfaces/IMailTemplateProvider';

export default class FakeMailTemplateProvider implements IMailTemplateProvider {
  public async parse({
    template,
    variables,
  }: IParseMailTemplateDTO): Promise<string> {
    return template;
  }
}
